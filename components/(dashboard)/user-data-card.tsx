import React from 'react'
import Image from 'next/image'
export type UserDataCardProps = {
    name: string
    email: string
    image: any
    time: string
}

export default function UserDataCard(props: UserDataCardProps) {
    const defaultImage = './mesh.png'
    return (
        <div className="flex flex-wrap  justify-between gap-3">
            <section className="flex justify-between gap-3">
                <Image
                    className="rounded-full"
                    width={50}
                    height={50}
                    src={props.image || defaultImage}
                    alt="avatar"
                    style={{ objectFit: 'cover' }} // Ensures the image scales properly within the bounds
                />
                <div className="text-sm ">
                    <p>{props.name}</p>
                    <div className="text-ellipsis overflow-hidden whitespace-nowrap w-[120px] sm:auto opacity-30">
                        {props.email}
                    </div>
                </div>
            </section>
            <p className="text-sm ">{props.time}</p>
        </div>
    )
}
