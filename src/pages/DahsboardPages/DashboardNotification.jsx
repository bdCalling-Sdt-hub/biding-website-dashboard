import { Table } from 'antd';
import { IoArrowBackSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useGetNotificationQuery } from '../../redux/api/dashboardApi';
import { useSocketContext } from '../../lib/SocketProviders';





const DashboardNotification = () => {
    const { data: getAllNotification } = useGetNotificationQuery();
    const { notifications } = useSocketContext()
    console.log(notifications?.length);
    const timeAgo = (date) => {
        const now = new Date();
        const past = new Date(date);
        const secondsAgo = Math.floor((now - past) / 1000);

        const intervals = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60,
            second: 1,
        };

        for (const [unit, seconds] of Object.entries(intervals)) {
            const count = Math.floor(secondsAgo / seconds);
            if (count >= 1) {
                return `${count} ${unit}${count > 1 ? 's' : ''} ago`;
            }
        }
        return 'just now';
    };
    const columns = [
        {
            dataIndex: 'notification',
            key: 'notification',
            render: text => <span>{text}</span>,
        },
        {
            dataIndex: 'time',
            key: 'time',
            width: '150px',
            render: text => <span>{text}</span>,
        },

    ];
    /** formatted notification table data */
    const formattedTableData = notifications?.map((notification) => (
        {
            key: notification?._id,
            notification: notification?.message,
            time: timeAgo(notification?.createdAt),
        }
    ))
    const handleDelete = key => {
        console.log(`Delete notification with key: ${key}`);
    }
    return (
        <div>
            <div className="flex justify-between items-center gap-4">
                <h3 className="text-[#242424] text-[20px] font-semibold flex items-center gap-2">
                    <Link to={-1}> <IoArrowBackSharp className='text-yellow' /></Link>
                    Notifications</h3>

            </div>
            <div>
                <h2 className='text-[18px] font-semibold py-2'>Total {notifications?.length} Notifications</h2>
                <Table columns={columns} dataSource={formattedTableData?.reverse()} pagination={false}
                    className="custom-pagination" />
            </div>
        </div>
    );
}

export default DashboardNotification;
