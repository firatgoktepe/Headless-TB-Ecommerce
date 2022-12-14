import React, { useState, useEffect } from 'react';
export const AppContext = React.createContext([{}, () => {}]);

export const AppProvider = (props) => {
    const [cart, setCart] = useState(null);

    useEffect(() => {
        
        let cartData = localStorage.getItem('wpd-cart');
        cartData = null !== cartData ? JSON.parse(cartData) : '';
        setCart(cartData);
        
    }, []);

    return <AppContext.Provider value={[cart, setCart]}>{props.children}</AppContext.Provider>;
};