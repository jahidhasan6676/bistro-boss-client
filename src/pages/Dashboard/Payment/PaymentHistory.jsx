import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payment = [] } = useQuery({
        queryKey: ['payment', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user?.email}`)
            return res.data;
        }
    })
    return (
        <div className="py-12">
            <h2 className="text-xl font-semibold">Payment history : {payment.length}</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Price</th>
                            <th>Transaction Id</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                       {
                         payment.map((history,index) =>  <tr key={history._id} index={index}>
                            <th>{index + 1}</th>
                            <td>{history.price}</td>
                            <td>{history.transactionId}</td>
                            <td>{history.date}</td>
                            <td>{history.status}</td>
                        </tr>
                        )
                       }
                       
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;