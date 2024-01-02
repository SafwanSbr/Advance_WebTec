import Footer from './footer'
import Header from './header'


export default function Layout(
    { children, status }
) {
    return (

        <>

            <Header status={status}></Header>
            <div className='flex flex-col min-h-screen bg-slate-800'>
                {children}

            </div>
            <Footer />

        </>


    )
}