import { useEffect, useState } from 'react';
import '../../styles/main.scss';

export default function Photo() {
    const [photo, setPhoto] = useState<ASorN[]>([]);

    interface ASorN {
        [key: string]: string | number;
    }

    const GetPhoto = async (): Promise<void> => {
        try {
            const response = await fetch(
                'https://picsum.photos/v2/list?page=0&limit=30',
            );
            if (!response.ok) {
                throw new Error('오류다');
            }
            const data = await response.json();
            console.log(data);
            setPhoto(data);
        } catch (error) {
            console.error('에러발생:', error);
        }
    };

    useEffect(() => {
        GetPhoto();
    }, []);

    return (
        <>
            {photo.map((photo) => {
                return (
                    <div key={photo.id} className="PhotoBox">
                        <img src={photo.download_url as string} alt="" />
                    </div>
                );
            })}
        </>
    );
}
