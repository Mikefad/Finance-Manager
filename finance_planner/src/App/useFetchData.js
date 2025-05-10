import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useFetchData = (setList, setError, setLoading, trigger ) => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/get_data`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const feedback = await response.json();

        if (feedback.success) {
          setList(feedback.data);
        } else {
          if (feedback.data === 'User not logged in') {
            navigate('/login');
          }
          setError(feedback.data);
        }
      } 
      catch (err) {
        setError("Error fetching tasks: " + err.message);
        console.error(err);
      }
      finally {
            setLoading(false);  // ✅ Stop loading after data fetch
      }
    };

    fetchTasks();
  }, [navigate, setList, setError, setLoading, trigger]);
};

export default useFetchData;
