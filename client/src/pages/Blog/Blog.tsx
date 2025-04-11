import "./Blog.scss";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { PostTitle } from "../../components/PostTitle/PostTitle";
import { Skeleton2 } from "../../components/Skeleton/Skeleton";
import dayjs from "dayjs";
import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

type TypePostsListAuthor = {
  id: string;
  author: {
    fullName: string;
    createdAt: Date;
  };
  authorId: string;
  content: string;
  theme: string;
  comments: string[];
};
type TypeCommensListAuthor = {
  text: string;
  author: {
    fullName: string;
  };
  authorId: string;
  postId: string;
  createdAt: string;
  id: string;
  post: { id: string; content: string };
};

export const Blog = () => {
  const { id } = useParams();

  //Получение всех постов юзера
  const getUserPosts = async () => {
    const result = await axios.get<TypePostsListAuthor[]>(
      `${import.meta.env.VITE_BASE_URL}/posts/authorId?id=${id}`
    );
    return result.data;
  };
  const { data, error, isLoading } = useQuery({
    queryKey: ["userPosts"], 
    queryFn: () => getUserPosts(),
  });
  console.log("userPosts:", data, "error:", error);
  const [post, setPost] = useState(true);

  //Получение всех комментариев юзера
  const getUserComments = async () => {
    const result = await axios.get<TypeCommensListAuthor[]>(
      `${import.meta.env.VITE_BASE_URL}/comments/authorId?id=${id}`
    );
    return result.data;
  };
  const comments = useQuery({
    queryKey: ["userComments"],
    queryFn: getUserComments,
    //Чтобы вызывать по  onClick={() => {refetch()} нужно указать поле enabled: false, и queryFn: getUserComments без вызова;
    enabled: false,
  });
  console.log("userComments:", comments.data, "errorComments:", comments.error);

  if (data === undefined) return;
  // if (comments.data === undefined) return;
  return (
    <div className="cabinet">
      {/* Хедер кабинета */}
      <div className="cabinet_header">
        <div className="color"></div>
        <div className="author">
          <img src="/dog.png" className="icon" />
          <div className="name">{data[0]?.author.fullName}</div>
          <div className="title">
            с нами с: {dayjs(data[0]?.author.createdAt).format("DD MMMM YYYY")}
          </div>
          <div className="navigate">
            <div
              onClick={() => setPost(true)}
              className={`${"cursor_pointer"} ${post === true ? "active" : ""}`}
            >
              посты
            </div>
            <div
              onClick={() => {
                comments.refetch();
                setPost(false);
              }}
              className={`${"cursor_pointer"} ${
                post === false ? "active" : ""
              }`}
            >
              комментарии
            </div>
          </div>
        </div>
      </div>

      {/* Мои посты */}
      {post && (
        <div className="postsBox">
          {isLoading ? <Skeleton2 /> : ""}
          {data && data?.length > 0 ? (
            data.map((item) => (
              <PostTitle
                key={item.id}
                id={item.id}
                theme={item.theme}
                author={item.author.fullName}
                content={item.content}
                comments={item?.comments?.length}
                authorId={item.authorId}
              />
            ))
          ) : (
            <div className="no_post">Здесь пока ничего нет</div>
          )}
        </div>
      )}

      {/* Мои комментарии */}
      {!post && (
        <div className="commentsBox">
          {comments?.isLoading ? <Skeleton2 /> : ""}
          {comments?.data && comments?.data?.length > 0 ? (  
            comments.data?.map((comment) => (
              <div key={comment.id} className="comment">
                <div className="comment_title">
                  <div className="comment_author2">
                    <b>{comment.author.fullName}</b> в посте:
                  </div>
                  <NavLink className="navLink_blog" to={`/${comment.post.id}`}>
                    <div className="comment_content">
                    {parse(
                        DOMPurify.sanitize(
                          comment.post.content.substring(0, 70) + "..."
                        ),
                      )}
                      {/* {comment.post.content.substring(0, 70) + "..."} */}
                    </div>
                  </NavLink>
                  <div>
                    Комментарий:
                    {dayjs(comment.createdAt).format("H:m /DD MMMM YYYY")}
                  </div>
                </div>
                {comment.text}
              </div>
            ))
          ) : (
            <div className="no_post">Здесь пока ничего нет</div>
          )}
        </div>
      )}
    </div>
  );
};

// onClick={() => {
//   queryClient.invalidateQueries({
//     queryKey: ["posts"],
//   });
//   queryClient.fetchQuery({
//     queryKey: ["post", comment.post.id],
//     queryFn: () => getPost(comment.post.id),
//   });
// }}
