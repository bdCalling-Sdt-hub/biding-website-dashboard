import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { GoArrowLeft } from 'react-icons/go'
import { Link } from 'react-router-dom'
import AddCategory from '../../components/ui/AddCategory'
import AddBanner from '../../components/ui/AddBanner'
import CategoryModal from '../../components/ui/CategoryModal'
import BannerModal from '../../components/ui/BannerAModal'
import { useGetAllCategoryQuery } from '../../redux/api/dashboardApi'
import { CgLogIn } from 'react-icons/cg'

const CategoryAndBanner = () => {

    const { data: getAllCategory } = useGetAllCategoryQuery()

    const [category, setCategory] = useState(true)
    const [openAddModal, setOpenAddModal] = useState(false)
    const [openBannerModal, setOpenBannerModal] = useState(false)
    const [modalTitle, setModalTitle] = useState('')
    // const [openCategoryModal, setOpenCategoryModal] = useState(false)

    const handleCategoryModal = () => {
        setModalTitle('Add New Ads')
        setCategory(true)
    }

    const handleBannerModal = () => {
        setModalTitle('Add New Video')
        setCategory(false)
    }
    return (
        <div className='bg-white p-5 rounded-md'>
            <div>
                <div className='flex items-center gap-2 mb-3 p-5'>

                    <p className='flex items-center gap-1'> <Link to={-1}><GoArrowLeft className='text-yellow' size={22} /></Link>Category & Banner</p>
                </div>
            </div>

            <div className='flex justify-between items-center'>
                {/* <Input className='max-w-[250px] h-10' prefix={<CiSearch className='text-2xl' />} placeholder="Search" /> */}
                <div className='flex items-center gap-5 px-5'>
                    <button onClick={() => handleCategoryModal()} className={` ${category ? 'bg-yellow text-white' : 'border border-yellow text-yellow'} px-4 rounded-sm start-center gap-1 py-2  flex justify-center items-center whitespace-nowrap`}>


                        Categories
                    </button>
                    <button onClick={() => handleBannerModal()} className={` ${category ? 'border border-yellow text-yellow' : 'bg-yellow text-white'}  px-4 rounded-sm start-center gap-1 py-2  flex justify-center items-center whitespace-nowrap`}>

                        Banner
                    </button>
                </div>

                {
                    category ? <button onClick={() => setOpenAddModal(true)} className='bg-yellow px-4 rounded-sm start-center gap-1 py-2 text-white flex justify-center items-center whitespace-nowrap'>
                        <FaPlus />
                        Add Category
                    </button> : <button onClick={() => setOpenBannerModal(true)} className='bg-yellow px-4 rounded-sm start-center gap-1 py-2 text-white flex justify-center items-center whitespace-nowrap'>
                        <FaPlus />
                        Add Banner
                    </button>
                }
            </div>


            {
                category ? <AddCategory getAllCategory={getAllCategory} /> : <AddBanner />
            }
            <CategoryModal setOpenAddModal={setOpenAddModal} openAddModal={openAddModal} />
            <BannerModal setOpenBannerModal={setOpenBannerModal} openBannerModal={openBannerModal} />
        </div>
    )
}

export default CategoryAndBanner