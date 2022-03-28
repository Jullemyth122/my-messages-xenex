import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import img1 from '../UsersAndMainPeople/assets/snatcher1.jpg'
import img2 from '../UsersAndMainPeople/assets/snatcher2.jpg'

const Comment = props => (
    <div className="box-2">
        <div className="top">
            <img src={props.imgList[props.count]} alt="" />
        </div>
        <div className="bottom">
            <div className="comments">
                <div className="add-comment">
                    <h3> Comments </h3>
                    {props.count == 0 ? <>
                    <form className="textfield" onSubmit={ e => props.handleSubmit(e,props.count,props.name,props.comment,props.listid)}>

                        <textarea 
                            name="text" 
                            type="text"
                            cols="30" 
                            rows="10"
                            value={props.comment}
                            onChange={e => props.setComment(e.target.value)}
                        />
                        <button type='submit'>
                            <ion-icon name="add-outline"></ion-icon>
                        </button>
                    </form>
                    </> : <></>}
                    {props.count == 1 ? <>
                    <form className="textfield" onSubmit={ e => props.handleSubmit(e,props.count,props.name,props.comment2,props.listid)}>
                        <textarea 
                            name="text" 
                            type="text"
                            cols="30" 
                            rows="10"
                            value={props.comment2}
                            onChange={e => props.setComment2(e.target.value)}
                        />
                        <button type='submit'>
                            <ion-icon name="add-outline"></ion-icon>
                        </button>                        
                    </form>
                    </> : <></>}
                </div>

                <div className="comment-list">
                    {props.mainitem.comments.map((item,idx) => {
                        return(
                            <div className="ta">
                                <div className='tp'>
                                    <div className="main">
                                        <div className="name">
                                            <p>{item.name}</p>
                                        </div>
                                        <div className="comment-text">
                                            <p>{item.comment_description}</p>
                                        </div>
                                    </div>
                                    <div className="like-reply">
                                        <div className="like" onClick={e => props.handleLikes(props.name,item.likes_list,props.listid)}><ion-icon name="thumbs-up-outline"></ion-icon> <p> {item.likes} </p> </div>
                                        <div className="reply" onClick={e => props.handleAddComment(e)}><ion-icon name="arrow-redo-outline"></ion-icon> <p> Reply </p> </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            
            </div>
        </div>
    </div>
)


function Main() {

    const location = useLocation()
    

    const [listid,setlistid] = useState([])

    const [comment,setComment] = useState("")
    const [comment2,setComment2] = useState("")

    const imgList = [img1,img2]

    useEffect(() => {
        axios.get('http://localhost:3333/comments')
            .then(list => 
                {
                    setlistid(list.data);
                    // console.log(list.data)
            })
            .catch(err => console.log(err))
    },[])

    const handleSubmit = (e,count,name,comment,listid) => {
        e.preventDefault()
        // console.log("TRUE")
        // console.log(name,count,comment)
        // console.log(listid)

        if (name == null) {
            return
        } else {

            // setlistid(prevState => {
            //     return prevState.map(xcomments => {

            //     })
            // })

            axios.post(`http://localhost:3333/comments/post/${listid}`,{
                _id: listid,
                comments:[
                    {
                        name: name.name,
                        likes:0,
                        likes_list:[{
                            confirmation_like:false,
                            name:name.name
                        }],
                        comment_description:comment,
                        comment_list:[]
                    }
                ]
            }).then(res => console.log(res)).catch(err => console.log(err))
        }

    }

    const handleAddComment = e => {

    }

    // This will show the likes of people to comments and then for "comments" 
    // it will show up the user if he already likes or not.
    const handleLikes = (name,comments_likelist,listid) => {
        // console.log('true')
        if (name == null) {
            return null
        } else {
            const index = comments_likelist.findIndex(el => el.name == name.name)

            console.log(index)
            console.log(comments_likelist)
            console.log("Baliw")
            
            console.log(comments_likelist[index])
            console.log(listid)

            if (comments_likelist[index].likes_list[index].confirmation_like == false) {
                comments_likelist[index].likes += 1

                axios.put(`http://localhost:3333/comments/likes/${listid}`,{
                    comments:[{
                        name:name.name,confirmation_like:true,likes:comments_likelist[index].likes
                    }] 
                })

            } else if (comments_likelist[index].likes_list[index].confirmation_like == true) {
                comments_likelist[index].likes -= 1

                
                axios.put(`http://localhost:3333/comments/likes/${listid}`,{
                    comments:[{
                        name:name.name,confirmation_like:false,likes:comments_likelist[index].likes
                    }] 
                })
            }

        }
    }

    const CommentsDeclaration = () => {
        return listid.map((items,count) => {

            return(
                <Comment
                    key = { count }
                    name = {location.state}
                    count = { count }
                    mainitem = { items }
                    imgList = { imgList }
                    comment = { comment }
                    comment2 =  { comment2 }
                    listid = { items._id }
                    setComment = { e => setComment(e)}
                    setComment2 = { e=> setComment2(e)}
                    handleSubmit = { e => 
                       {
                        if (count == 0) {
                            handleSubmit(e,count,location.state,comment,items._id)  
                        } else if (count == 1) {
                            handleSubmit(e,count,location.state,comment2,items._id)  
                        } 
                    }}
                    handleAddComment = { e => handleAddComment(e)}
                    handleLikes = { e => handleLikes(location.state,items.comments,items._id)}
                />
            )
        })
    }


    return (
  
        
            <div className="container">
                <div className="sub-container">
                    <div className="main-prisoner">
                        {CommentsDeclaration()}
                    </div>
                </div>
            </div>
    

    )
}

export default Main