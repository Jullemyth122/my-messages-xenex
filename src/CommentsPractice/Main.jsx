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
                    <form className="textfield" onSubmit={ e => props.handleSubmit(e,props.count,props.name,props.list_of_likes,props.comment,props.listid)}>

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

    const [list_of_likes,setList_of_likes] = useState([])

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

        axios.get('http://localhost:3333/users')
            .then(res => {
                res.data.map((item,idx) => {
                    setList_of_likes(prevState => [...prevState,{confirmation_like:false,name:item.name,_id:item._id}]);
                })
            })
            .catch(err => console.log(err))

        listid.map((items,idx) => {
            console.log(items.comments)
            console.log(items.comments)
            items.comments.map((items2,idx2) => {
                console.log(items2._id)
                // console.log(items2.likes_list,2)
                console.log(list_of_likes)
                console.log(list_of_likes.length)
                console.log(items2.likes_list.length)
                
                if (list_of_likes.length == items2.likes_list.length) {
                    

                } else {
                    axios.put(`http://localhost:3333/comments/append/${listid[0]._id}`,{
                        sub_id: items2._id,
                        comments: list_of_likes,
                        old_items:items2.likes_list
                    })
                    .then(res => {})
                    .catch(err => console.log(err))
                }

            })
        })

        // for (let i = 0; i < listid.length; i++) {
        //     axios.post(`http://localhost:3333/comments/post/${listid[i]._id}`,{
        //         sub_id:listid[i]._id,
        //         comments:[listid.map((items,idx) => {
        //             console.log(items)
        //             return items.comments.map((items2,idx2)=>{
        //                 return {
        //                     ...items2,
        //                     name:items2.name,
        //                     likes_list:list_of_likes
        //                 }
        //             })
        //         })]
        //     })
        // }
        
    },[])

    const handleSubmit = (e,count,name,list_of_likes,comment,listid) => {
        e.preventDefault()
        // console.log("TRUE")
        // console.log(name,count,comment)
        // console.log(listid)

        if (name == null) {
            return
        } else {

            axios.post(`http://localhost:3333/comments/post/${listid}`,{
                _id: listid,
                comments:[
                    {
                        name: name.name,
                        likes:0,
                        likes_list:list_of_likes,
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

        }
    }

    const CommentsDeclaration = () => {
        return listid.map((items,count) => {
            // console.log(listid)
            return(
                <Comment
                    key = { count }
                    name = {location.state}
                    count = { count }
                    mainitem = { items }
                    imgList = { imgList }
                    comment = { comment }
                    listid = { items._id }
                    list_of_likes = {list_of_likes}
                    setComment = { e => setComment(e)}
                    handleSubmit = { e => handleSubmit(e,count,location.state,list_of_likes,comment,items._id)}
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