import React, {useEffect} from 'react';

const Banner = ({text, isAlert}) => {
    useEffect(() => {
        const banner = document.querySelector('.banner');

        function activeBanner() {
            banner.classList.add('active')
            setTimeout(()=>{
                banner.classList.remove('active')
            },2000)
        }

        if (text !== '') {
            activeBanner()
        }
    })
    return (
        <p className={`' banner transition fixed w-[300px] block left-1/2 -translate-x-1/2 -translate-y-[200px] text-center py-6 text-white rounded shadow-lg ' ${isAlert ? 'bg-red' : 'bg-green'}`}>
            {text}
        </p>
    )
}
export default Banner;