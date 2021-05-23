import React, {  useState ,useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Link } from "@material-ui/core";
import AdminIcon from "../Icons/AdminIcon";
import "../Login.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector} from 'react-redux'
import {dispatchLogin, fetchUser, dispatchGetUser} from '../redux/actions/authAction'
import { fetchAllUsers, dispatchGetAllUsers} from '../redux/actions/usersAction'
import axios from 'axios';
import {showErrMsg, showSuccessMsg} from '../utils/notification/Notification'
const useStyles = makeStyles({
	main_card: {
		margin: "0",
		background: "#C4C4C4",
		borderRadius: "40px",
		width: "55em",
		height: "33em",
		display: "flex",
		overflow: "hidden",
	},
	right_card: {
		position: "relative",
		left: "0em",
		background: "white",
		margin: "0",
		paddingLeft: "2em",
		paddingRight: "2em",
		width: "20em",
		height: "100%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		alignContent: "center",
		flexDirection: "row",
	},
	card_content: {
		width: "100%",
	},
	text: {
		fontFamily: "Poppins",
		fontWeight: "600",
		fontSize: "17px",
	},
	text_field: {
		marginTop: "1em",
		fontFamily: "Poppins",
	},
	btn: {
		marginTop: "1.5em",
	},
	btn_text: {
		width: "100%",
		fontFamily: "Poppins",
		fontWeight: "500",
		fontSize: "15px",
		textTransform: "capitalize",
		color: "white",
	},
	mdps_oublier: {
		position: "relative",
		left: "56%",
		marginTop: "0.2em",
		fontFamily: "Poppins",
		fontWeight: "500",
		fontSize: "11px",
	},
	img_div: {
		position: "static",
		height: "100%",
		width: "60%",
		display: "flex",
		justifyContent: "center",
		alignContent: "center",
		alignItems: "center",
	},
});

const initialState = {
    email: '',
    password: '',
    err: '',
    success: ''
}
export default function AdminLogin() {
	const classes = useStyles();

    
	const [user, setUser] = useState(initialState)
    const dispatch = useDispatch()
    const history = useHistory()

    const {email, password, err, success} = user

    const handleChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value, err: '', success: ''})
    }


    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const res = await axios.post('/users/admin', {email, password})
            setUser({...user, err: '', success: res.data.msg})

            localStorage.setItem('firstLogin', true)

            dispatch(dispatchLogin())
            history.push("/")

        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }
	
    const token = useSelector(state => state.token) 
	const auth = useSelector(state => state.auth)
    

	useEffect(() => {
		const firstLogin = localStorage.getItem('firstLogin')
		if(firstLogin){
		  const getToken = async () => {
			const res = await axios.post('/users/refresh_token', null)
			dispatch({type: 'GET_TOKEN', payload: res.data.access_token})
		  }
		  getToken()
		}
	},[auth.isLogged, dispatch])
	
	useEffect(() => {
		if(token){
		  const getUser = () => {
			dispatch(dispatchLogin())
	
			return fetchUser(token).then(res => {
			  dispatch(dispatchGetUser(res))
			})
		  }
		  getUser()
		}
    },[token, dispatch])

	useEffect(() => {
		if(token){
		  const getUsers = () => {
			dispatch(dispatchLogin())
	
			return fetchAllUsers(token).then(res => {
			  dispatch(dispatchGetAllUsers(res))
			})
		  }
		  getUsers()
		}
	},[token, dispatch])

	
	return (
		<div>
			<Card className={classes.main_card} elevation={0}>
				<Card className={classes.right_card} elevation={0}>
					<CardContent className={classes.card_content}  >
					    {err && showErrMsg(err)}
                        {success && showSuccessMsg(success)}
						<form onSubmit={handleSubmit}>
						   <Typography
							className={classes.text}
							variant="h6"
							align="center"
							color="primary"
						   >
							Se Connecter
						   </Typography>
						   <TextField
							variant="outlined"
							placeholder="Email"
							id="email"
							size="small"
							classes={{ root: classes.text_field }}
							fullWidth
							type="text"
							name="email"
							value={email}
							
							onChange={handleChangeInput}
						   />
						   <br />
						   <TextField
	                        type="password"
	                        variant="outlined"
	                         label="Mot de passe"
							 id="password"
							 name="password"
	                            size="small"
	                            classes={{ root: classes.text_field }}
	                               fullWidth
	                            
	                         value={password}
	
	                         onChange={handleChangeInput} 
						   />
						   <br />
						   <Link
							component="button"
							color="primary"
							underline="hover"
							variant="inherit"
							classes={{ root: classes.mdps_oublier }}
							onClick={() => history.push("/recover_password")}
						   >
							Mot de passe oublier?
						   </Link>
						   <br />
						   <Button
							className={classes.btn}
							variant="contained"
							type="submit"
							color="primary"
							classes={{ label: classes.btn_text }}
							fullWidth
					       >   
							Connexion
						   </Button>
						</form>
					</CardContent>
				</Card>
				<div className={classes.img_div}>
					<AdminIcon />
				</div>
			</Card>
		</div>
	);
}
