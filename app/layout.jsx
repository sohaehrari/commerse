import Navbar from './components/Navbar'


import "bootstrap/dist/css/bootstrap.min.css"







export default function Layout({children}){
  return(
    <html lang="en">
    
    <body>
     <div className="lay">
      <Navbar/>
      <footer/>
      {children}

      </div> 


    </body>
    </html>
      

  )
}