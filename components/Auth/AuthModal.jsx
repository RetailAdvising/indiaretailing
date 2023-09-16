import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import LogIn from './LogIn'
export default function AuthModal({visible,hide,modal,show}) {
    return (
        <>
            <Rodal visible={visible} animation='slideUp' onClose={hide}>
                <LogIn isModal={false} auth={true} />
            </Rodal>
        </>
    )
}