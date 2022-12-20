import React, {useState, useEffect} from "react";
import axios from "axios";
import { Pagination, Input } from "antd";
import styles from "./PaginationApp.module.css"
import { Button, Modal } from 'antd';
import background from "../component/images/background.jpg"
import { AiOutlineFieldNumber } from "react-icons/ai";


function PaginationApp() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postBody, setPostBody] = useState("")

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [posts, setPosts] = useState([])
  const [total, setTotal] = useState("")
  const [page, setPage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(10)
  const [search, setSearch] = useState("")
  const [filteredPost, setFilteredPost] = useState([])



  useEffect(() => {
    const loadPosts = async () => {
      const response = await axios.get (
        "https://jsonplaceholder.typicode.com/posts"
      );
        setPosts(response.data)
        setTotal(response.data.length)
    }
    loadPosts();
  }, [])

  useEffect(() => {
    if(search !== "") {
      setFilteredPost(posts.filter(post => post.title.includes(search)))
      setPage(1)
    } else {
      setFilteredPost(posts)
    }
  }, [posts, search])

  const indexOfLastPage = page === 1 ? 10 : page * postPerPage;
  const indexOfFirstPage = indexOfLastPage - postPerPage;
  const currentPage = filteredPost.slice(indexOfFirstPage, indexOfLastPage)

  const onShowSizeChange = (current, pageSize) => {
    setPostPerPage(pageSize)
  };

  const itemRender = (current, type, originalElement) => {
    if(type === "prev") {
      return <a>Previous</a>
    }
    if(type === "next") {
      return <a>Next</a>
    }

    return originalElement
  }

  return (
 <div className={styles.container} style={{backgroundImage: `url(${background})`}} > 
  <div className={styles.main}>
    <div className={styles.wrapper}>
      <div className={styles.header_search}>
        <div className={styles.products}>
            Products
        </div>
          <Input.Search
            className={styles.search}
            placeholder="search here"
            onChange={(event) => {
              setSearch(event.target.value)
              }}
              />
        </div>
       <div>
      </div>
    </div>


       <div className={styles.main_header}>
        <div className={styles.header_title}>
          <div>
            <AiOutlineFieldNumber className={styles.header_icon} />
          </div>
          <div>Name</div>
        </div>
          <div>
            <div>More information</div>
          </div>
       </div>


    <div>
      {currentPage.map((post) => (
      <div>
      <div className={styles.main_post}>
        <div key={post.id}>
          {post.id}. <span className={styles.post_title}>{post.title}</span> 
        </div>
        <div>
            <Button type="primary" onClick={() => {
              showModal()
              setPostBody(post.body)
              }}>
                Read More
           </Button>
           </div>
      </div>
        <hr className={styles.hr_style} />
      </div>
      ))}

      <Pagination 
        className={styles.pagin_click}
        onChange={(value) => setPage(value)}
        pageSize={postPerPage} 
        total={total} 
        current={page}
        onShowSizeChange={onShowSizeChange}
        itemRender={itemRender}
        />
        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk}
                onCancel={handleCancel}>
                 {postBody}
        </Modal> 
    </div>
  </div>
</div>
  )
}
export default PaginationApp;