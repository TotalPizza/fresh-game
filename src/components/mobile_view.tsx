import Image from 'next/image'

export default function MobileView(){
    return(        
        <body style={{backgroundColor: "black"}}>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh"}}>
                <h1 style={{textAlign: "center", position: "absolute", zIndex: 10, bottom: "10%", fontFamily: "Arial"}}>Imagine the disrespect of wanting to use my app with a mobile device ... <br/><br/> I spit in your face</h1>
                <Image priority={true} src="/images/mobile.jpg" alt='pog_loading' fill={true}/>
            </div>
        </body>
    )
}
