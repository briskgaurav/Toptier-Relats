import React from 'react'

export function FlameSVG(props) {
  return (
    <svg width="28" className='h-full w-full object-contain' height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M8.27918 11.3284C4.14165 15.9619 5.90064 26.2499 14.108 26.2499C22.3155 26.2499 25.0892 18.128 19.6556 12.2572C14.2291 6.38287 16.1946 2.625 16.1946 2.625C6.66975 8.85385 15.2404 16.0824 11.7331 16.9439C10.7396 17.1885 9.72483 16.6461 9.27262 15.7279C8.83821 14.8452 8.38244 13.4377 8.27918 11.3248V11.3284Z" fill="currentColor"/>
    </svg>
  );
}

export function ThermalSVG(props) {
  return (
    <svg width="28" className='h-full w-full object-contain' height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M23.3906 13.7226L11.1406 26.8476C11.0108 26.9862 10.8395 27.0787 10.6524 27.1114C10.4654 27.144 10.2728 27.1149 10.1038 27.0284C9.93475 26.942 9.7984 26.8029 9.71534 26.6322C9.63227 26.4615 9.60698 26.2684 9.64329 26.082L11.2467 18.0616L4.94344 15.6947C4.80807 15.644 4.68735 15.5607 4.59207 15.452C4.49679 15.3433 4.42991 15.2127 4.39741 15.0719C4.36491 14.9311 4.3678 14.7844 4.40583 14.6449C4.44385 14.5055 4.51583 14.3776 4.61532 14.2728L16.8653 1.1478C16.9951 1.00927 17.1665 0.916707 17.3535 0.884098C17.5406 0.851489 17.7331 0.880597 17.9022 0.967031C18.0712 1.05346 18.2075 1.19253 18.2906 1.36325C18.3737 1.53397 18.399 1.72708 18.3627 1.91343L16.7548 9.94265L23.0581 12.3062C23.1925 12.3572 23.3123 12.4405 23.4068 12.5488C23.5013 12.657 23.5678 12.7869 23.6002 12.9269C23.6326 13.0669 23.6301 13.2127 23.5928 13.3515C23.5555 13.4903 23.4845 13.6178 23.3863 13.7226H23.3906Z" fill="currentColor"/>
    </svg>
  );
}

export function TemperatureSVG(props) {
  return (
    <svg width="28" className='h-full w-full object-contain' height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M14 17.5V5.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 22.75C15.4497 22.75 16.625 21.5747 16.625 20.125C16.625 18.6753 15.4497 17.5 14 17.5C12.5503 17.5 11.375 18.6753 11.375 20.125C11.375 21.5747 12.5503 22.75 14 22.75Z" fill="currentColor"/>
      <path d="M10.5 5.25C10.5 4.32174 10.8687 3.4315 11.5251 2.77513C12.1815 2.11875 13.0717 1.75 14 1.75C14.9283 1.75 15.8185 2.11875 16.4749 2.77513C17.1313 3.4315 17.5 4.32174 17.5 5.25V15.0938C18.5701 15.8389 19.3745 16.9061 19.7961 18.14C20.2176 19.374 20.2344 20.7103 19.8439 21.9544C19.4534 23.1986 18.6761 24.2856 17.625 25.0573C16.5739 25.8291 15.304 26.2452 14 26.2452C12.696 26.2452 11.4261 25.8291 10.375 25.0573C9.32391 24.2856 8.54656 23.1986 8.15608 21.9544C7.76559 20.7103 7.78236 19.374 8.20393 18.14C8.62551 16.9061 9.42989 15.8389 10.5 15.0938V5.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function Cards({
  heading = 'Operating temperature',
  content = '-70ºC to +210ºC',
  imageSrc = '/assets/img/revitex/icons/temperature.svg',
  imageAlt = 'Operating temperature',
  svgColor = 'text-orange',
  extraContent = '',
  extraContentClassName = '',
  imageWidth = 100,
  imageHeight = 100,
  className = '',
  headingClassName = '',
  contentClassName = 'text-[2.5vw] w-full max-sm:text-[4vw] max-sm:w-full',
  imageClassName = '',
  wrapperClassName = '',
  positionClassName = 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
}) {
  // Decide which icon to render
  let IconComponent = null;
  if (imageSrc.includes('flammability')) {
    IconComponent = FlameSVG;
  } else if (imageSrc.includes('thermal')) {
    IconComponent = ThermalSVG;
  } else if (imageSrc.includes('temperature')) {
    IconComponent = TemperatureSVG;
  }

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
        <div className={`w-[2vw] text-orange max-md:w-[4vw]  max-sm:w-[6vw] h-auto ${imageClassName}`}>
          {IconComponent ? (
            <IconComponent style={{ width: '100%', height: 'auto' }} className={svgColor} />
          ) : null}
        </div>
      </div>
      <p
        className={`tracking-tighter leading-none font-medium font-robert ${contentClassName}`}
      >
        {content}
      </p>
      {extraContent && <p className={`tracking-tighter leading-none font-medium font-robert ${extraContentClassName}`}>{extraContent}</p>}
      </div>
  )
}
