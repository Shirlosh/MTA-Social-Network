const OK = 200;
const FORBIDDEN = 403;

async function gate(props) {
    const response = await fetch('/api/is_admin');
    if (response.status == OK) {
        let res = await response.json();
        return res;
    } else if (response.status == FORBIDDEN) {
        window.location.replace('/login/');
    } else {
        alert(response.message);
    }
}