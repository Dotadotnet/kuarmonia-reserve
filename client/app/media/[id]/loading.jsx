import React from 'react'

const SingleMediaLoading = () => {
    return (
        <>
            <div className="col-span-12 lg:col-span-6 md:col-span-6">
                <div className="h-[200px] w-full rounded bg-gray-200 animate-pulse" />
            </div>
            <div className="col-span-12 lg:col-span-6 md:col-span-6">
                <div className="flex flex-col w-full gap-y-4">
                    <div className="h-[200px] w-full rounded bg-gray-200 animate-pulse" />
                    <div className="h-[100px] w-full rounded bg-gray-200 animate-pulse" />
                    <div className="h-[50px] w-full rounded bg-gray-200 animate-pulse" />
                </div>
            </div>
        </>
    )
}

export default SingleMediaLoading