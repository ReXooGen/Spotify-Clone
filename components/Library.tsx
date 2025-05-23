"use client"

import {TbPlaylist} from "react-icons/tb";
import {AiOutlinePlus} from "react-icons/ai";
import AuthModal from './AuthModal';
import useAuthModal from "@/app/hooks/useAuthModal";
import { useUser } from '@/app/hooks/useUser';
import useUploadModal from "@/app/hooks/useUploadModal";
import { Song } from "@/type";
import MediaItem from "./MediaItem";
import useOnPlay from "@/app/hooks/useOnPlay";
import useSubscribeModal from './../app/hooks/useSubscribeModal';

interface LibraryProps {
    songs: Song[];
}



const Library: React.FC<LibraryProps> = ({
    songs
}) => {
    const subscribeModal = useSubscribeModal(); 
    const authModal = useAuthModal();
    const { user, subscription } = useUser();
    const uploadModal = useUploadModal();

    const onPlay = useOnPlay(songs);

    const onClick = () => {
        if (!user) {
            return authModal.onOpen();
        }

        if(!subscription) {
            return subscribeModal.onOpen();   
        }

        return uploadModal.onOpen();
    };
    return(
        <div className="flex flex-col">
            <div
             className="
                flex
                items-center
                justify-between
                px-5
                pt-4
             "  
            >
                <div
                    className="
                        inline-flex
                        items-center
                        gap-x-2
                    "
                >
                    <TbPlaylist className="text-neutral-400" size={26}/>
                    <p className="
                        text-neutral-400
                        font-medium
                        text-md
                    "
                    >
                        Your Library
                    </p>
                </div>
                    <AiOutlinePlus 
                        onClick={onClick}
                        size={20}
                        className="
                            text-neutral-400
                            cursor-pointer
                            hover:text-white
                            transition
                        "
                    />
            </div>
            <div className="
                flex
                flex-col
                gap-y-2
                mt-4
                px-3
            "
            >
                {songs.map((item) => (
                    <MediaItem
                        onClick={(id: string) => onPlay(id)}
                        key={item.id}
                        data={item}
                    />
                ))}
            </div>
        </div>
    );
}

export default Library;