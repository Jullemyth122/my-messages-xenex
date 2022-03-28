import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import img1 from './assets/snatcher1.jpg'
import img2 from './assets/snatcher2.jpg'
import img3 from './assets/snatcher3.jpg'
import img4 from './assets/snatcher4.jpg'
import img5 from './assets/snatcher5.jpg'
import img6 from './assets/snatcher6.jpg'

const Person = props => (
        <div className="box">
            <div className="top">
                <img src={props.imgList[props.count]} alt="" />
            </div>
            <div className="bottom">
                <div className="thumbs">
                    {props.name}
                    <div className="likes"> <div onClick={e => props.handleLikes(props.name,props.subitem,props.mainitem)}><ion-icon name="thumbs-up-outline" style={ props.subitem == null ? (null) : (props.subitem.confirmation_like ? { color:'blue' } : {color:'black'}) }></ion-icon> </div> <p>{props.mainitem.likes}</p> </div>
                    <div className="dislikes"><div onClick={e => props.handleDislikes(props.name,props.subitem,props.mainitem)}><ion-icon name="thumbs-down-outline" style={ props.subitem == null ? (null) : (props.subitem.confirmation_dislike ? { color:'blue' } : {color:'black'})}></ion-icon></div> <p>{props.mainitem.dislikes}</p> </div>
                </div>
                <div className="favorite"> <div onClick={e => props.handleFavorite(props.main,props.mainitem)} ><ion-icon name="heart-outline" style={ props.subitem == null ? (null) : (props.subitem.confirmation_favorite ? { color:'blue' } : {color:'black'}) }></ion-icon></div> <p> {props.mainitem.favorites} </p> </div>
                <div className="comments"> <div><ion-icon name="chatbox-ellipses-outline"></ion-icon></div>{props.comment}</div>
            </div>
        </div>
)

function Main() {
  
    const location = useLocation()

    const [likers,setlikers] = useState(0)
    const [islike,setislike] = useState(false)

    const [dislikers,setdislikers] = useState(0)
    const [isdislike,setdislike] = useState(false)

    const [favorite,setfavorite] = useState(0)
    const [isfavorite,setisfavorite] = useState(false)

    const [comment,setcomments] = useState(0)
    const [iscomment,setiscomment] = useState(false)

    const imgList = [img1,img2,img3,img4,img5,img6]

    const [personlikers,setpersonlikers] = useState([])

    useEffect(() => {
        axios.get('http://localhost:7171/likes')
            .then(prisoners => {
                setpersonlikers(prisoners.data);
                // console.log(prisoners.data)
                }
            )
            .catch(err => console.log(err))
    },[])

    const handleLikes = (name,subitem,items) => {

        if (subitem == null) {
            return
        } else {
            // console.log(subitem._id)

            if (subitem.confirmation_like == false) {
                items.likes += 1
                // console.log(subitem.confirmation)
                console.log(items.likes)
                setpersonlikers(prevState => {
                    return prevState.map(xlikers => {
                        const person = xlikers.people.findIndex(el => 
                            {if (el.name == name) {
                                return true
                            } 
                        })

                        console.log(person)
                        // console.log(person  )
                        console.log(xlikers.people[person])
                        if (xlikers.people[person].name === name) {
                            if (xlikers.people[person]._id == subitem._id) {
                                // console.log(name)                            
                                return {
                                    ...xlikers,
                                    likes: items.likes,
                                    people:[{confirmation_like:true,
                                        confirmation_dislike:subitem.confirmation_dislike,
                                        confirmation_favorite:subitem.confirmation_favorite,
                                        name:xlikers.people[person].name,
                                        key:xlikers.key,_id:subitem._id}]
                                }   
                            }
                            else {
                                return xlikers
                            }
                            
                        } else {
                            return xlikers
                        }
                    
                    })
                })
                console.log(subitem._id)
                axios.put(`http://localhost:7171/likes/item/${items._id}`,{ likes: items.likes,sub_item: subitem.name ,people:[{confirmation_like:true}]})
                    .then(p => console.log(p))
                    .catch(err => console.log(err))
            } 
            else if (subitem.confirmation_like == true) {
                // console.log(subitem.confirmation)
                items.likes -= 1
                console.log(items.likes)
                setpersonlikers(prevState => {
                    return prevState.map(xlikers => {
                        const person = xlikers.people.findIndex(el => 
                            {if (el.name == name) {
                                return true
                            } 
                        })
                        // console.log(person)
                        if (xlikers.people[person].name === name) {
                            if (xlikers.people[person]._id == subitem._id) {
                                console.log(xlikers.people[person]._id,subitem._id)                            
                                return {
                                    ...xlikers,
                                    likes: items.likes,
                                    people:[{confirmation_like:false,
                                        confirmation_dislike:subitem.confirmation_dislike,
                                        confirmation_favorite:subitem.confirmation_favorite,
                                        name:xlikers.people[person].name,
                                        key:xlikers.key,_id:subitem._id}]
                                }   
                            }
                            else {
                                return xlikers
                            }
                        } else {
                            return xlikers
                        }
                    
                    })
                })
                axios.put(`http://localhost:7171/likes/item/${items._id}`,{ likes: items.likes,sub_item: subitem.name,people:[{confirmation_like:false}]})
                    .then(p => console.log(p))
                    .catch(err => console.log(err))
            }   
    
        }
    }

    const handleDislikes = (name,subitem,items) => {
    
        if (subitem == null) {
            return
        } else {
            // console.log(subitem._id)

            if (subitem.confirmation_dislike == false) {
                items.dislikes += 1
                // console.log(subitem.confirmation)
                console.log(items.dislikes)
                setpersonlikers(prevState => {
                    return prevState.map(xlikers => {
                        const person = xlikers.people.findIndex(el => 
                            {if (el.name == name) {
                                return true
                            } 
                        })
                        console.log(xlikers.people[person].name)
                        // console.log(person  )
                        if (xlikers.people[person].name === name) {
                            
                            if (xlikers.people[person]._id == subitem._id) {
                                // console.log(name)    
                                console.log(xlikers.people[person]._id,subitem._id)                            
                        
                                return {
                                    ...xlikers,
                                    dislikes: items.dislikes,
                                    people:[{confirmation_like:subitem.confirmation_like,
                                        confirmation_dislike:true,
                                        confirmation_favorite:subitem.confirmation_favorite,
                                        name:xlikers.people[person].name,
                                        key:xlikers.key,_id:subitem._id}]
                                }   
                            }
                            else {
                                return xlikers
                            }
                            
                        } else {
                            return xlikers
                        }
                    
                    })
                })
                console.log(subitem._id)
                axios.put(`http://localhost:7171/likes/item/${items._id}`,{ dislikes: items.dislikes,sub_item: subitem.name ,people:[{confirmation_dislike:true}]})
                    .then(p => console.log(p))
                    .catch(err => console.log(err))
            } 
            else if (subitem.confirmation_dislike == true) {
                // console.log(subitem.confirmation)
                items.dislikes -= 1
                console.log(items.dislikes)
                setpersonlikers(prevState => {
                    return prevState.map(xlikers => {
                        const person = xlikers.people.findIndex(el => 
                            {if (el.name == name) {
                                return true
                            } 
                        })
                        // console.log(person)
                        if (xlikers.people[person].name === name) {
                            if (xlikers.people[person]._id == subitem._id) {
                                console.log(xlikers.people[person]._id,subitem._id)                            
                                return {
                                    ...xlikers,
                                    dislikes: items.dislikes,
                                    people:[{confirmation_like:subitem.confirmation_like,
                                        confirmation_dislike:false,
                                        confirmation_favorite:subitem.confirmation_favorite,
                                        name:xlikers.people[person].name,
                                        key:xlikers.key,_id:subitem._id}]
                                }   
                            }
                            else {
                                return xlikers
                            }
                        } else {
                            return xlikers
                        }
                    
                    })
                })
                axios.put(`http://localhost:7171/likes/item/${items._id}`,{ dislikes: items.dislikes,sub_item: subitem.name,people:[{confirmation_dislike:false}]})
                    .then(p => console.log(p))
                    .catch(err => console.log(err))
            }   
    
        }
    
    }
    const handleFavorite = (name,subitem,items) => {
        
        if (subitem == null) {
            return
        } else {
            // console.log(subitem._id)

            if (subitem.confirmation_favorite == false) {
                items.favorites += 1
                // console.log(subitem.confirmation)
                console.log(items.favorites)
                setpersonlikers(prevState => {
                    return prevState.map(xlikers => {
                        const person = xlikers.people.findIndex(el => 
                            {if (el.name == name) {
                                return true
                            } 
                        })
                        // console.log(person  )
                        if (xlikers.people[person].name === name) {
                            if (xlikers.people[person]._id == subitem._id) {
                                // console.log(name)    
                                console.log(xlikers.people[person]._id,subitem._id)                            
                        
                                return {
                                    ...xlikers,
                                    favorites: items.favorites,
                                    people:[{confirmation_like:subitem.confirmation_like,
                                        confirmation_dislike:subitem.confirmation_dislike,
                                        confirmation_favorite:true,
                                        name:xlikers.people[person].name,
                                        key:xlikers.key,_id:subitem._id}]
                                }   
                            }
                            else {
                                return xlikers
                            }
                            
                        } else {
                            return xlikers
                        }
                    
                    })
                })
                console.log(subitem._id)
                axios.put(`http://localhost:7171/likes/item/${items._id}`,{ favorites: items.favorites,sub_item: subitem.name ,people:[{confirmation_favorite:true}]})
                    .then(p => console.log(p))
                    .catch(err => console.log(err))
            } 
            else if (subitem.confirmation_favorite == true) {
                // console.log(subitem.confirmation)
                items.favorites -= 1
                console.log(items.favorites)
                setpersonlikers(prevState => {
                    return prevState.map(xlikers => {
                        const person = xlikers.people.findIndex(el => 
                            {if (el.name == name) {
                                return true
                            } 
                        })
                        // console.log(person)
                        if (xlikers.people[person].name === name) {
                            if (xlikers.people[person]._id == subitem._id) {
                                console.log(xlikers.people[person]._id,subitem._id)                            
                                return {
                                    ...xlikers,
                                    favorites: items.favorites,
                                    people:[{confirmation_like:subitem.confirmation_like,
                                        confirmation_dislike:subitem.confirmation_dislike,
                                        confirmation_favorite:false,
                                        name:xlikers.people[person].name,
                                        key:xlikers.key,_id:subitem._id}]
                                }   
                            }
                            else {
                                return xlikers
                            }
                        } else {
                            return xlikers
                        }
                    
                    })
                })
                axios.put(`http://localhost:7171/likes/item/${items._id}`,{ favorites: items.favorites,sub_item: subitem.name,people:[{confirmation_favorite:false}]})
                    .then(p => console.log(p))
                    .catch(err => console.log(err))
            }   
    
        }

    }
    const handleComment = (e,items) => {

    }

    const PeopleDeclarations = () => {
        return personlikers.map((items,count) => {
            
            // if (count == 4) {
            //     console.log(personlikers)     
            // }
            // console.log(items.people[0]._id)
            // console.log(items._id)
            // console.log(items.people[0])   
            const person = items.people.findIndex(el => 
                {if (el.name == location.state.name) {
                    return true
                } 
            })        

            console.log(items.people[person])
            // console.log(items)
            // console.log(person)
            console.log(location.state.name)

            // console.log(perso)
            return(
            <Person
                key = { count }
                name = { location.state.name }
                count = { count }
                mainitem = { items }
                subitem = { person >= 0 ? items.people[person] : 'Guest' }
                imgList = { imgList }
                handleLikes = { e => handleLikes(location.state, (person >= 0 ? items.people[person] : null) , items)}
                handleDislikes = { e => handleDislikes(location.state, (person >=0 ? items.people[person] : null),items)}
                handleFavorite = { e =>   handleFavorite(location.state, (person >=0 ? items.people[person] : null),items)}
                handleComment = { e => handleComment()}
            />
            )
        })
    }

    return (

      <div className='container'>
          
          <div className="sub-container">
            <div className="main-prisoner">
                {PeopleDeclarations()}
            </div>
          </div>        

      </div>
  )
}

export default Main