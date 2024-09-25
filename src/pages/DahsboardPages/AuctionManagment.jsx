import { useState } from 'react';
import img1 from '../../assets/prod1.png'
import { Table, } from 'antd';
import { CiEdit } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Button from '../../components/ui/Button';
import { IoAddOutline } from 'react-icons/io5';
import CreateUpdateAuctionModal from '../../components/ui/CreateUpdateAuctionModal';
import { useGetAllAuctionQuery } from '../../redux/api/dashboardApi';
import { checkImageSource } from '../../lib/checkImageSource';
const AuctionManagment = () => {

  const { data: getAllAuction, isLoading } = useGetAllAuctionQuery()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [visible, setVisible] = useState(false);
  const [fileList, setFileList] = useState([]);


  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleRemove = (file) => {
    setFileList(fileList.filter((item) => item.uid !== file.uid));
  }

console.log(getAllAuction?.data?.result);

  /** Auction managment data format table */
  const auctionDataFormat = getAllAuction?.data?.result?.map((auction, i) => {
    return {
      key: i + 1,
      name: auction?.name,
      img: checkImageSource(auction?.images?.[0]),
      category: auction?.category,
      reservedBid: auction?.reservedBid,
      incrementValue: auction?.incrementValue,
      statingAndEndTime: `${auction?.startingDate.split('T')[0]}-at-${auction?.startingTime
      }  ` ,
      status: auction?.status
    }
  })
  // const dataSource = [
  //   {
  //     key: "#12333",
  //     name: "Kathryn Murphy",
  //     img: img1,
  //     category: "Electronics",
  //     reservedBid: "2",
  //     incrementValue: "1 cent",
  //     statingAndEndTime: "10/06/24 at 4:45 PM",
  //     status: "Active"

  //   },
  //   {
  //     key: "#12333",
  //     name: "Kathryn Murphy",
  //     img: img1,
  //     category: "Electronics",
  //     reservedBid: "2",
  //     incrementValue: "1 cent",
  //     statingAndEndTime: "10/06/24 at 4:45 PM",
  //     status: "Upcoming"

  //   },
  //   {
  //     key: "#12333",
  //     name: "Kathryn Murphy",
  //     img: img1,
  //     category: "Electronics",
  //     reservedBid: "2",
  //     incrementValue: "1 cent",
  //     statingAndEndTime: "10/06/24 at 4:45 PM",
  //     status: "Complete"

  //   },

  // ];

  const columns = [
    {
      title: "Order ID",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Auction Item",
      dataIndex: "name",
      key: "name",
      render: (_, record) => {
        return (
          <div className="flex items-center gap-2">
            <img
              src={record?.img}
              className="w-[40px] h-[40px] rounded-[8px]"
              alt=""
            />
            <p className="font-medium">{record?.name}</p>
          </div>
        );
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },

    {
      title: "Reserved Bid",
      dataIndex: "reservedBid",
      key: "reservedBid",
    },
    {
      title: "Reserved Bid",
      dataIndex: "reservedBid",
      key: "reservedBid",
    },
    {
      title: "Increment Value",
      dataIndex: "incrementValue",
      key: "incrementValue",
    },
    {
      title: "Start Date & Time",
      dataIndex: "statingAndEndTime",
      key: "statingAndEndTime",
    },


    {
      title: "Status",
      dataIndex: "status",
      key: "status",

      render: (_, record) => {
        return (
          <div className="flex items-center justify-center gap-1">
            <button
              className={`px-8 min-w-32 py-2 rounded-3xl font-semibold  border 
    ${record?.status === 'ACTIVE' ? 'border-[#338BFF] text-[#338BFF] hover:bg-[#338BFF]' :
                  record?.status === 'UPCOMING' ? 'border-[#F3A211 text-[#F3A211] hover:bg-[#F3A211] hover:text-white' :
                    record?.status === 'COMPLETED' ? 'border-[#2AB9A4] text-[#2AB9A4] hover:bg-[#2AB9A4]' : ''} 
    hover:text-white`}
            >
              <p className='hover:text-white text-[12px] '>
                {record?.status}
              </p>
            </button>

          </div>
        );
      },
      align: "center",
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <a href="#edit" onClick={() => {
            setIsModalOpen(true)
          }} className="bg-yellow text-white p-1 rounded-sm"><CiEdit size={20} /></a>
          <a href="#delete" className="bg-[#D9000A] text-white p-1 rounded-sm"><RiDeleteBin6Line size={20} /></a>
        </div>
      ),
    },
  ];




  return (
    <div className='p-5 bg-white rounded-md'>

      <div className="flex justify-between item-center ">
        <div className="flex items-center gap-2">
          <Link to={-1}><FaArrowLeft size={18} className='text-yellow' /></Link>
          <span className='font-semibold text-[20px]'>Auction Mangment</span>
        </div>
        <div>
          <Button className='flex  items-center px-5 py-2' onClick={() => setIsModalOpen(true)} ><IoAddOutline /> Create Auction</Button>
        </div>
      </div>


      <div className='mt-10'>
        <Table dataSource={auctionDataFormat} columns={columns} className="custom-pagination" pagination={{
          pageSize: 10,
          showTotal: (total, range) => `Showing ${range[0]}-${range[1]} out of ${total}`,
          locale: {
            items_per_page: '',
            prev_page: 'Previous',
            next_page: 'Next',
          },
        }} />
      </div>


      {/* <Modal centered
        open={isModalOpen}
        footer={false}
        onCancel={() => setIsModalOpen(false)}
      >
        <h1 className='text-center font-medium text-[20px]'>Edit Auction</h1>


        <Form
          layout='vertical'
        >
          <div className='flex  justify-between items-center gap-2 mt-5'>
            <Form.Item
              label="Item Name"
              className='w-full'
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Category"
              className='w-full'
            >
              <Input />
            </Form.Item>
          </div>
          <div className='flex  justify-between items-center gap-2 '>
            <Form.Item
              label="Reserved Bid"
              className='w-full'
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Increment Value"
              className='w-full'
            >
              <Input />
            </Form.Item>
          </div>
          <div className='flex justify-between items-center gap-2 '>
            <Form.Item
              label="Starting Date"
              className='w-full'
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Starting Time"
              className='w-full'
            >
              <Input />
            </Form.Item>
          </div>
          <Form.Item
            label="Description"
          >
            <TextArea />
          </Form.Item>


          <Form.Item label="Upload Images">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={handleUploadChange}
              onRemove={handleRemove}
              beforeUpload={() => false}
              multiple
            >
              {fileList.length >= 4 ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Add Image</div>
                </div>
              )}
            </Upload>
          </Form.Item>

          <div className='flex justify-between  gap-3'>
            <Form.Item className='w-full' >
              <Button className='w-full'>Save</Button>
            </Form.Item>
            <Form.Item className='w-full' >
              <button className='bg-[#d9000a] text-white w-full p-1 rounded-md' onClick={() => setIsModalOpen(false)} >cancel</button>
            </Form.Item>

          </div>
        </Form>


      </Modal> */}
      <CreateUpdateAuctionModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />

    </div>
  );
}

export default AuctionManagment;
