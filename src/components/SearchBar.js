import React, {Component} from 'react'
import axios from 'axios'
import loader from './loader.gif'
class SearchBar extends Component{
    constructor(props) {
        super(props);
        this.searchUser=this.searchUser.bind(this)
        this.saveUser=this.saveUser.bind(this)
        this.state={results:[],isLoading:false,showInstructions:true,error:false,errorType:""}
      }
    
    searchUser(e){
        var userInput=e.target.value
        var self=this
        self.setState({
            isLoading:true,
            showInstructions:false
        })

        setTimeout(()=>{
          if(userInput !== null && userInput.length !== 0){
            axios.get('https://api.github.com/search/users?q='+e.target.value)
            .then(async (response)=>{
                var custom_result=response.data.items.slice(0,5)
                var i;
                for(i=0; i<5;i++){
                    if(i<custom_result.length){
                    custom_result[i]['user_object']=await axios.get("https://api.github.com/users/"+custom_result[i]['login']).then((response2)=>{
                        return (response2.data)
                    })
                    }
                }
                self.setState({
                    results:custom_result,
                    isLoading:false
                })
            })
            .catch((e)=>{
                var temp=e.response.data.message
                self.setState({
                    isLoading:false,
                    error:true,
                    errorType:temp
                })
            })
            
          }
          else{
            self.setState({
                isLoading:false,
                showInstructions:true
            })    
          }
        },1000)
      }
      containsObject(obj, list) {
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i].login === obj.login) {
                return true;
            }
        }
    
        return false;
        }
    saveUser(index){
        
        var savedUsers=[]
        if(localStorage.getItem('savedUsers')){
            savedUsers=JSON.parse( localStorage.getItem('savedUsers'))
            var value = this.state.results[index]
            if(this.containsObject(value,savedUsers)){
                alert('User already added in Local Store')
            }
            else{
                savedUsers.push(this.state.results[index])
                localStorage.setItem('savedUsers',JSON.stringify(savedUsers))
                alert('User Saved to local storage, click on saved users to view them.')
            }
        }
        else{
            savedUsers.push(this.state.results[index])
            localStorage.setItem('savedUsers',JSON.stringify(savedUsers))
            alert('User Saved to local storage, click on saved users to view them.')
        }
    }
    
      render(){
          return(
                <div className="container-fluid mb-4">
                    <div className="row">
                        <div className="col-lg-4 offset-lg-4">
                            <div className="mt-5 pt-5 text-center">
                                
                                <div className="mt-2">
                                    
                                    <input className="form-control text-white bg-transparent border border-info text-info" placeholder="Search User" onChange={this.searchUser}></input>
                                    {!this.state.showInstructions &&
                                        <div className="mt-4 pr-3" style={{overflow:"auto",height:"400px"}}>
                                            {this.state.isLoading ?
                                                <img src={loader} alt="github-loader"/>
                                                :
                                                <div>
                                                    {this.state.error 
                                                        ?
                                                            <div className="alert alert-danger">
                                                                <h2>Error Occured!!</h2>
                                                                <p>
                                                                    {this.state.errorType}
                                                                </p>
                                                            </div>    
                                                        : 
                                                            <div>
                                                                {this.state.results.map
                                                                    (
                                                                    (result,i) => 
                                                                        <div className="custom-bg mt-2 text-left" onClick={()=>this.saveUser(i)} key={i}>
                                                                            <div className="row">
                                                                                <div className="col-lg-2 text-center">
                                                                                    <img className="round-frame" src={result.avatar_url} alt={result.login} height="60" width="60"/>
                                                                                </div>
                                                                                <div className="col-lg-10">
                                                                                    @<strong className="text-info">{result.login}<br></br></strong>
                                                                                    Bio: <strong className="text-info">{result.user_object.bio}</strong><br></br>
                                                                                    Followers:<strong className="text-info">{result.user_object.followers}</strong>&nbsp;&nbsp;
                                                                                    Public Repos: <strong className="text-info">{result.user_object.public_repos}</strong>

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }
                                                            </div>
                                                    }
                                                    
                                                    
                                                </div>
                                            }
                                        </div>
                                     }
                                    {this.state.showInstructions &&
                                        <h3 className="text-orange text-left"><ol className="mt-3">
                                            <li>Enter Github user name in the search bar to search users.</li>
                                            <li>Click on the result you like, it will save it to the local store</li>
                                        </ol></h3>
                                    }
                                 </div>
                            </div>    
                        </div>
                </div>
            </div>
        )
      }
}
export default SearchBar