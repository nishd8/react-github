import React,{Component} from 'react'

class SavedUsers extends Component{

    constructor(props){
        super(props);
        this.state={savedUsers:JSON.parse(localStorage.getItem('savedUsers'))}
        this.deleteUser=this.deleteUser.bind(this)
    }
    deleteUser(index){
        var len=this.state.savedUsers.length
        if(len>0 && len!==undefined){
            var value=this.state.savedUsers[index]
            var finalArr=this.state.savedUsers.filter(item => item !== value)
            this.setState({
                savedUsers:finalArr
            })
            localStorage.setItem('savedUsers',JSON.stringify(finalArr))
            alert('User Removed from local store')
        }
    }
    render(){
        return(
            <div className="container-fluid mb-4">
                 <div className="row">
                    <div className="col-lg-4 offset-lg-4">
                        <div className="mt-4 pr-3" style={{overflow:'auto',height:'500px'}}>
                        {
                            this.state.savedUsers.map
                                (
                                (user,i) => 
                                    <div className="custom-bg mt-2 text-left" key={i}>
                                        <div className="row">
                                            <div className="col-lg-2 text-center mb-3">
                                                <img className="round-frame" src={user.avatar_url} height="60" width="60" alt={user.login}/>
                                            </div>
                                            <div className="col-lg-7 mb-3">
                                                @<strong className="text-info">{user.login}<br></br></strong>
                                                Bio: <strong className="text-info">{user.user_object.bio}</strong><br></br>
                                                Followers:<strong className="text-info">{user.user_object.followers}</strong>&nbsp;&nbsp;
                                                Public Repos: <strong className="text-info">{user.user_object.public_repos}</strong>

                                            </div>
                                            <div className="col-lg-3 text-center">
                                                <a href={user.user_object.html_url} rel="noreferrer" className="btn btn-info mr-3" target="_blank"><i className="fa fa-share"></i></a>
                                                <button className="btn btn-danger" onClick={()=>this.deleteUser(i)}><i className="fa fa-trash"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            
                        }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default SavedUsers