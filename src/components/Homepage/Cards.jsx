import Image from 'next/image'
import React from 'react'

export default function Cards({
  heading = 'Operating temperature',
  content = '-70ºC to +210ºC',
  imageSrc = '/assets/img/revitex/icons/temperature.svg',
  imageAlt = 'Operating temperature',
  imageWidth = 100,
  imageHeight = 100,
  className = '',
  headingClassName = '',
  contentClassName = 'text-[2.5vw] w-full max-sm:text-[4vw] max-sm:w-full',
  imageClassName = '',
  wrapperClassName = '',
  positionClassName = 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2', // NEW PROP
}) {
  return (
    <div
      className={`
        ${positionClassName}
        w-fit h-fit text-white bg-black/10
        p-[2vw] max-md:p-[4vw]
        backdrop-blur-[10px]
        rounded-[1.5vw] max-md:rounded-[3vw]
        max-w-[14vw] max-md:max-w-[80vw]
        flex flex-col
        gap-[3.5vw] max-md:gap-[5vw]
        ${className}
      `}
    >
      <div className={`flex items-center justify-between gap-[1vw] max-sm:gap-[2vw] ${wrapperClassName}`}>
        <p className={`w-1/2 leading-none text-[1vw] max-sm:text-[3vw] max-sm:w-2/3 ${headingClassName}`}>{heading}</p>
        <div className={`w-[2vw] max-md:w-[4vw]  max-sm:w-[6vw] h-auto ${imageClassName}`}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={imageWidth}
            height={imageHeight}
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      </div>
      <p
        className={`tracking-tighter leading-none font-medium font-robert ${contentClassName}`}
      >
        {content}
      </p>
    </div>
  )
}
