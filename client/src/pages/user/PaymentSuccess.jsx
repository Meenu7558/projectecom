import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config/axioInstance';
import { useSearchParams } from 'react-router-dom';


export const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get('session_id'); 

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const res = await axiosInstance.get(`/payment/verify/${sessionId}`);
        alert(res.data.message);
        navigate('/user/orders');
      } catch (err) {
        alert('Payment verification failed. Please contact support.');
      }
    };

    if (sessionId) {
      verifyPayment();
    }
  }, [sessionId, navigate]);

  return (
    <div className="text-center mt-20">
      <h2 className="text-2xl font-semibold text-green-600 dark:text-green-400">Verifying your payment...</h2>
      <p>Please wait, this won't take long.</p>
    </div>
  );
};