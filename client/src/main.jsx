import { createRoot } from 'react-dom/client';
import './index.css';
import 'remixicon/fonts/remixicon.css';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './redux/store';


createRoot(document.getElementById('root')).render(
  
    <Provider store={store}>
      <App/>
    </Provider>
  
);
