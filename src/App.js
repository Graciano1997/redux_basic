import { useSelector, useDispatch } from 'react-redux';
import CartContainer from './component/CartContainer';
import NavBar from './component/NavBar';
import { calculateTotals, getCartItem } from './Feature/cart/cartSlice';
import { useEffect } from 'react';
import Modal from './component/Modal';


function App() {
  const { cartItems, isLoading } = useSelector((store) => store.cart);
  const { isOpen } = useSelector((store) => store.modal);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

  useEffect(() => {
    dispatch(getCartItem())
  }, []);

  if (isLoading) {
    return (
      <div className='loading'>
        <h1>Loading ...</h1>
      </div>
    )
  }

  return (
    <main>
      {isOpen && <Modal />}
      <NavBar />
      <CartContainer />
    </main>
  );
}
export default App;
