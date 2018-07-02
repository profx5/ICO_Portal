// import React from 'react'
// import AddOwnEthereumAccount from './AddOwnEthereumAccount'
// import Link from './Link'
// import Button from './Button'

// const HeaderAboutBlocked = ({
//     handleChange,
//     ethereum_address,
//     onGenerateAccount,
//     children,
//     render,
// }) => (
//     <header>
//         <div className='overlay-wrapper in-middle'>
//             <div className='modal-for-banner'>
//                 <div className='in-middle' style={{height: "100%"}}>
//                     {render()}
//                     <AddOwnEthereumAccount
//                         ethereum_address={ethereum_address}
//                         handleChange={handleChange}
//                     />
//                     <Link to='https://metamask.io/'>Download metamask</Link>
//                     <Button text='Generate new acount' info={true} clickHandler={onGenerateAccount}/>
//                 </div>
//                 <button className='btn btn-primary' onClick={() => {
//                     window.location.reload()
//                 }}>
//                     refresh
//                 </button>
//             </div>
//         </div>
//     </header>
// )

// export default HeaderAboutBlocked