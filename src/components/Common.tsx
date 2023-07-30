export const Title = ({ children }) => {
    return (<>
        <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
            {children}
        </h3>
    </>)
}

export const SubTitle = ({ children }) => {
    return (<>
        <span className="text-base font-normal text-gray-600 dark:text-gray-400">
            {children}
        </span>
    </>)
}

export const Panel = ({ title, subtitle, children }) => {
    return (
        <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8 my-6">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <Title>{title}</Title>
                    <SubTitle>{subtitle}</SubTitle>
                </div>
                {/* <div className="shrink-0">
                    <a
                        href="#"
                        className="rounded-lg p-2 text-sm font-medium text-primary-700 hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700"
                    >
                        View all
                    </a>
                </div> */}
            </div>
            {children}
            {/* <SalesChart /> */}
            {/* <div className="mt-5 flex items-center justify-between border-t border-gray-200 pt-3 dark:border-gray-700 sm:pt-6">
                <Datepicker />
                <div className="shrink-0">
                    <a
                        href="#"
                        className="inline-flex items-center rounded-lg p-2 text-xs font-medium uppercase text-primary-700 hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700 sm:text-sm"
                    >
                        Sales Report
                        <svg
                            className="ml-1 h-4 w-4 sm:h-5 sm:w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </a>
                </div>
            </div> */}
        </div>
    )
}