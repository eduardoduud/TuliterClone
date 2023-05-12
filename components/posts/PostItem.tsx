import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";

import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { AiOutlineHeart, AiFillHeart, AiOutlineMessage } from "react-icons/ai";

import Avatar from "../Avatar";
import useLike from "@/hooks/useLike";


interface PostItemProps {
    data: Record<string, any>;
    userId?: string;
}


const PostItem: React.FC<PostItemProps> = ({ data, userId }) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const { data: currentUser } = useCurrentUser();
    const { hasLiked, toggleLike } = useLike({ postId: data.id, userId });

    const goToUser = useCallback((event: any) => {
        event.stopPropagation();

        router.push(`/users/${data.user.id}`);
    }, [router, data.user.id]);

    const goToPost = useCallback(() => {
        router.push(`/posts/${data.id}`);
    }, [data.id, router]);

    const onLike = useCallback((event: any) => {
        event.stopPropagation();

        if (!currentUser) {
            return loginModal.onOpen();
        }

        toggleLike();
    }, [loginModal, toggleLike, currentUser]);

    const createdAt = useMemo(() => {
        if (!data?.createdAt) {
            return null;
        }

        return formatDistanceToNowStrict(new Date(data.createdAt));
    }, [data?.createdAt]);

    const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;

    return ( 
        <div 
            onClick={goToPost}
            className="
                border-b-[1px]
                border-neutral-800
                p-5
                cursor-pointer
                hover:bg-neutral-900
                transition
            "
        >
            <div className="flex flex-row items-start gap-3">
                <Avatar userId={data.user.id}/>
                <div className="">
                    <div className="flex flex-row items-center gap-2">
                        <p 
                            onClick={goToUser}
                            className="text-white font-semibold cursor-pointer hover:underline"
                        >{data.user.name}</p>
                        <span 
                            onClick={goToUser}
                            className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
                            @{data.user.username}
                        </span>
                        <span className="text-neutral-500 text-sm">
                            {createdAt} ago
                        </span>
                    </div>
                    <span className="text-white mt-1 break-all">
                        {data.body}
                    </span>
                    <div className="flex flex-row items-center mt-3 gap-10">
                        <div 
                            className="
                                flex
                                flex-row
                                items-center
                                text-neutral-500
                                gap-1
                                cursor-pointer
                                transition
                                hover:text-sky-500
                            ">
                            <p className="
                                hover:bg-blue-300
                                hover:bg-opacity-10
                                rounded-full
                                p-2
                                "
                            >
                                <AiOutlineMessage size={20}/>
                            </p>
                            <p>
                                {data.comments?.length || 0}
                            </p>
                        </div>
                        <div 
                            onClick={onLike}
                            className="
                                flex
                                flex-row
                                items-center
                                text-neutral-500
                                gap-1
                                cursor-pointer
                                transition
                                hover:text-red-500
                            ">
                            <p className="
                                hover:bg-blue-300
                                hover:bg-opacity-10
                                rounded-full
                                p-2
                                "
                            >
                                <LikeIcon size={20} color={hasLiked ? 'red' : ''}/>
                            </p>
                            <p>
                                {data.likedIds.length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default PostItem;