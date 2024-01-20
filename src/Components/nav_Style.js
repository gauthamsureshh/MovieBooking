import React, { useState, useEffect } from 'react'
import "../Styles/nav_style_css.css"


function NavStyle() {
    const [text, setText] = useState('');
    const messages=['Popcorn in hand, anticipation in the air, let the show begin!',
                    'Your ticket to another dimension starts here.',
                    'More than a theatre, it\'s a portal to different worlds'
                ]

    const load=()=>{
        setText(messages.shift() || '')
    }

    useEffect(() => {
        load();
    const interval = setInterval(load,7000)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <span className="text sec-text">{text}</span>
    </div>
  );
};

export default NavStyle;
