import {
    makeStyles
} from '@material-ui/core/styles';
import {
    deepPurple
} from '@material-ui/core/colors';

export default makeStyles((theme) => ({
    paddings: {
        padding: '1rem 3rem'
    },
    mainContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    settings: {
        borderBottom: '2px solid grey'
    },
    profileUpdate: {
        width: '50%',
        margin: 'auto'
    },
    submit: {
        width: "30%",
        margin: 'auto'
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
        width: '4rem',
        height: '4rem',
        fontSize: '24pt',
        margin: '1rem',
    },
    userHeader: {
        display: 'flex',
        padding: '1rem',
        margin: '1rem',
        background: 'inherit',
        borderBottom: '2px solid grey'
    },
    userName: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '32pt',

    },
}));