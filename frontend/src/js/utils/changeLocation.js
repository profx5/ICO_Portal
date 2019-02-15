import history from 'js/utils/getBrowserHistory';


export default function changeLocation (path) {
    try {
        history.push(path)
    } catch(err) {
        return err;
    }
}
