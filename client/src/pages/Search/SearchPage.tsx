// import { useEffect, useState } from "react";
import { PostTitle } from "../../components/PostTitle/PostTitle";
import "./SearchPage.scss";
import axios from "axios";
import { Skeleton1 } from "../../components/Skeleton/Skeleton";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

type TypePostsList = {
  id: string;
  author: {
    fullName: string;
  };
  authorId: string;
  content: string;
  theme: string;
  comments: string[];
};

export const SearchPage = () => {
  const [search] = useSearchParams();
  const title = search.get("title");
  console.log(search.get("title"));

  const getPosts = async (title: string| null) => {
    const result = await axios.get<TypePostsList[]>(
      `${import.meta.env.VITE_BASE_URL}/posts/search?title=${title}`
    );
    return result.data;
  };

  const { data, isLoading } = useQuery({
    //по этому ключу будут храниться в кэше данные
    queryKey: ["posts", title],
    queryFn:() => getPosts(title),
    // refetchInterval: 5000,
  });
  console.log("data", data);
  
  //Чтобы новые запросы со словом в поиске уходили на сервер
  useEffect (() => {
    getPosts(title);
  }, [data, title]);

  return (
    <div className="posts_list">
      {isLoading ? <Skeleton1 /> : ""}
      {data?.length === 0 ? (
        <div className="not_found">Посты не найдены. Попробуйте изменить запрос</div>
      ) : (
        ""
      )}
      {data?.map((item) => (
        <PostTitle
          key={item.id}
          id={item.id}
          theme={item.theme}
          author={item.author.fullName}
          content={item.content}
          comments={item?.comments?.length}
          authorId={item.authorId}
        />
      ))}
    </div>
  );
};
