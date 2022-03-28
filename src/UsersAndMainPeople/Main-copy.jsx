// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { useLocation } from 'react-router-dom'

// import img1 from './assets/snatcher1.jpg'
// import img2 from './assets/snatcher2.jpg'
// import img3 from './assets/snatcher3.jpg'
// import img4 from './assets/snatcher4.jpg'
// import img5 from './assets/snatcher5.jpg'
// import img6 from './assets/snatcher6.jpg'


// const Person = props => (
//         <div className="box">
//             <div className="top">
//                 <img src={props.imgList[props.count]} alt="" />
//             </div>
//             <div className="bottom">
//                 <div className="thumbs">
//                     <h5>{props.name}
//                     </h5>
//                     <h5>
//                         {String(props.subitem == null ? null : props.subitem.name)} 
//                     </h5>
//                     <div className="likes" > <div onClick={e => props.handleLikes(props.name,props.subitem,props.mainitem)} ><ion-icon name="thumbs-up-outline" style={ props.sub_item.confirmation_like ? { color:'black' } : {color:'blue'}} ></ion-icon> </div> <p>{props.mainitem.likes}</p> </div>
//                     <div className="dislikes"><div onClick={e => props.handleDislikes(props.name,props.subitem,props.mainitem)} ><ion-icon name="thumbs-down-outline" style={ props.sub_item.confirmation_dislike ? { color:'black' } : {color:'blue'}}></ion-icon></div> <p>{props.dislikers}</p> </div>
//                 </div>
//                 <div className="favorite"> <div onClick={e => props.handleFavorite(props.main,props.mainitem)} ><ion-icon name="heart-outline" style={ props.sub_item.confirmation_favorite ? { color:'black' } : {color:'blue'}}></ion-icon></div> <p> {props.favorite} </p> </div>
//                 <div className="comments"> <div><ion-icon name="chatbox-ellipses-outline"></ion-icon></div>{props.comment}</div>
//             </div>
//         </div>
// )

// function Main_copy() {
  
//     const location = useLocation()

//     const [likers,setlikers] = useState(0)
//     const [islike,setislike] = useState(false)

//     const [dislikers,setdislikers] = useState(0)
//     const [isdislike,setdislike] = useState(false)

//     const [favorite,setfavorite] = useState(0)
//     const [isfavorite,setisfavorite] = useState(false)

//     const [comment,setcomments] = useState(0)
//     const [iscomment,setiscomment] = useState(false)

//     const imgList = [img1,img2,img3,img4,img5,img6]

//     const [personlikers,setpersonlikers] = useState([])

//     useEffect(() => {
//         axios.get('http://localhost:7171/likes')
//             .then(prisoners => {
//                 setpersonlikers(prisoners.data);
//                 // console.log(prisoners.data)
//                 }
//             )
//             .catch(err => console.log(err))
//     },[])

//     const handleLikes = (name,subitem,items) => {
//         if (subitem == null) {
//             return
//         } else {
//             // console.log(subitem._id)

//             if (subitem.confirmation == false) {
//                 items.likes += 1
//                 // console.log(subitem.confirmation)
//                 // console.log(items.likes)
//                 setpersonlikers(prevState => {
//                     return prevState.map(xlikers => {
//                         const person = xlikers.people.findIndex(el => 
//                             {if (el.name == name) {
//                                 return true
//                             } 
//                         })
//                         // console.log(person >= 0 ? person : null )
//                         if (xlikers.people[person >= 0? person : null].name === name) {
//                             if (xlikers.people[person >= 0? person : null]._id == subitem._id) {
//                                 // console.log(name)    
//                                 console.log(xlikers.people[person]._id,subitem._id)                            
                        
//                                 return {
//                                     ...xlikers,
//                                     likes: items.likes,
//                                     people:[{confirmation:true,name:xlikers.people[person >= 0? person : null].name,key:xlikers.key,_id:subitem._id}]
//                                 }   
//                             }
//                             else {
//                                 return xlikers
//                             }
                            
//                         } else {
//                             return xlikers
//                         }
                    
//                     })
//                 })
//                 console.log(subitem._id)
//                 axios.put(`http://localhost:7171/likes/item/${items._id}`,{ likes: items.likes,sub_item: subitem.name ,people:[{confirmation:true,key:subitem.key,name:subitem.name,_id:subitem._id}]})
//                     .then(p => console.log(p))
//                     .catch(err => console.log(err))
//             } 
//             else if (subitem.confirmation == true) {
//                 // console.log(subitem.confirmation)
//                 items.likes -= 1
//                 // console.log(items.likes)
//                 setpersonlikers(prevState => {
//                     return prevState.map(xlikers => {
//                         const person = xlikers.people.findIndex(el => 
//                             {if (el.name == name) {
//                                 return true
//                             } 
//                         })
//                         // console.log(person)
//                         if (xlikers.people[person >= 0? person : null].name === name) {
//                             if (xlikers.people[person >= 0? person : null]._id == subitem._id) {
//                                 console.log(xlikers.people[person]._id,subitem._id)                            
//                                 return {
//                                     ...xlikers,
//                                     likes: items.likes,
//                                     people:[{confirmation:false,name:xlikers.people[person >= 0? person : null].name,key:xlikers.key,_id:subitem._id}]
//                                 }   
//                             }
//                             else {
//                                 return xlikers
//                             }
//                         } else {
//                             return xlikers
//                         }
                    
//                     })
//                 })
//                 axios.put(`http://localhost:7171/likes/item/${items._id}`,{ likes: items.likes,sub_item: subitem.name,people:[{confirmation:false,key:subitem.key,name:subitem.name,_id:subitem._id}]})
//                     .then(p => console.log(p))
//                     .catch(err => console.log(err))
//             }   
    
//         }
//         // console.log(subitem.confirmation)

//         // // console.log(subitem.confirmation)

//         // // console.log(items)
//         // console.log(subitem._id)
//         // console.log(subitem)
//         // console.log(items._id)
//         // console.log(name)
//     }

//     const handleDislikes = (e,items) => {

//     }
//     const handleFavorite = (e,items) => {

//     }
//     const handleComment = (e,items) => {

//     }

//     const PeopleDeclarations = () => {
//         return personlikers.map((items,count) => {
            
//             // if (count == 4) {
//             //     console.log(personlikers)     
//             // }
//             // console.log(items.people[0]._id)
//             // console.log(items._id)
//             // console.log(items.people[0])   
//             const person = items.people.findIndex(el => 
//                 {if (el.name == location.state) {
//                     return true
//                 } 
//             })        

//             // console.log(items.people[person]._id)

//             // console.log(person > 0 ? person: null)
//             return(
//             <Person
//                 key = { count }
//                 name = { location.state }
//                 count = { count }
//                 mainitem = { items }
//                 subitem = { person >= 0 ? items.people[person] : null }
//                 imgList = { imgList }
//                 handleLikes = { e => handleLikes(location.state, (person >= 0 ? items.people[person] : null) , items)}
//                 handleDislikes = { e => handleDislikes()}
//                 handleFavorite = { e =>   handleFavorite()}
//                 handleComment = { e => handleComment()}
//             />
//             )
//         })
//     }

//     return (

//       <div className='container'>
          
//           <div className="sub-container">
//             {location.state}
//             <div className="main-prisoner">
//                 {PeopleDeclarations()}
//             </div>
//           </div>        

//       </div>
//   )
// }

// export default Main_copy