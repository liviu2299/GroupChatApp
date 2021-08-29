import React, {useContext, useState, useMemo, useEffect} from 'react'

import { SocketContext } from '../../context/SocketContext';
import { UserContext } from '../../context/UserContext'

export default function Circle(props) {

    const { proximity }  = useContext(UserContext);
    const { users } = useContext(SocketContext);

    const radius = 300;
    const [center, setCenter] = useState({
        x: 0,
        y: 0
    })
    const [color, setColor] = useState('black');
    const [usersAround, setUsersAround] = useState([]);

    function clamp(min, max, value) {
        if(value < min){
            return min;
        }else if(value > max){
            return max;
        }else{
            return value;
        }
    }

    const circle = useMemo( () => ({
        height: `600px`,
        width: `600px`,
        border: `2px dotted ${color}`,
        borderRadius: `50%`,
        left: `${proximity.x - 235}px`,
        top: `${proximity.y - 251}px`,
        transition: 'transform 500ms',
        position: 'absolute'
    }), [proximity, color])

    useEffect(() => {
        setCenter({
            x: (proximity.x + 65),
            y: (proximity.y + 48)
        });
    }, [proximity])

    useEffect(() => {
           
        users.forEach(user => {

            const pointOnRectx = clamp(user.position.x, user.position.x+130, center.x);
            const pointOnRecty = clamp(user.position.y, user.position.y+98, center.y);
    
            const circleToRectPoint = {x: pointOnRectx-center.x, y:pointOnRecty-center.y}
    
            const dist = Math.round(Math.sqrt((circleToRectPoint.x*circleToRectPoint.x) + (circleToRectPoint.y*circleToRectPoint.y)));
    
            if(dist < radius){
                if(!usersAround.find(elem => elem.id === user.id))
                {
                    setUsersAround((prevUsersAround) => {
                        return prevUsersAround.concat({
                            id: user.id
                        })
                    })
                }
            }
            else{
                if(usersAround.find(elem => elem.id === user.id))
                {
                    setUsersAround((prevUsersAround) => {
                        return prevUsersAround.filter(elem => elem.id !== user.id);
                    })
                }    
            }

        });

    }, [center, users])

    useEffect(() => {
        if(usersAround.length > 0){
            setColor('red');
        }else{
            setColor('black');
        }
        console.log(usersAround);
    }, [usersAround])

    return (
        <div>
            <div>
                {
                    usersAround.map((user) => {
                        return(
                            <div key={user.id}>{user.id}</div>
                        )
                    })
                }
            </div>
            <div style={circle}></div>
        </div>
    )
}
