import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { toggleSidebar } from '../../store/themeConfigSlice';
import AnimateHeight from 'react-animate-height';
import { IRootState } from '../../store';
import { useState, useEffect } from 'react';

const Sidebar = () => {
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
    const location = useLocation();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');

            const ul = selector.closest('ul.sub-menu');
            if (ul) {
                const menuElement = ul.closest('li.menu');
                if (menuElement) {
                    const navLinkElements = menuElement.querySelectorAll('.nav-link');
                    if (navLinkElements.length > 0) {
                        const ele: any = navLinkElements[0];
                        setTimeout(() => {
                            ele.click();
                        });
                    } else {
                        console.error('No .nav-link elements found.');
                    }
                } else {
                    console.error('No parent li.menu element found.');
                }
            } else {
                console.error('No ul.sub-menu element found.');
            }
        } else {
            console.error('No matching selector found.');
        }
    }, []);

    const lightImage = '/assets/images/liquid8.png';
    const darkImage = '/assets/images/liquid8-light.png';

    useEffect(() => {
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div className="bg-white dark:bg-black h-full">
                    <div className="flex justify-between items-center px-4 py-3">
                        <NavLink to="/" className="main-logo flex items-center shrink-0">
                            <img className="w-40 flex-none" src={themeConfig.theme === 'dark' ? darkImage : lightImage} alt="logo" />
                        </NavLink>

                        <button
                            type="button"
                            className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 m-auto">
                                <path d="M13 19L7 12L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <PerfectScrollbar className="h-[calc(100vh-80px)] relative">
                        <ul className="relative font-semibold space-y-0.5 p-4 py-0">
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'dashboard' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('dashboard')}>
                                    <div className="flex items-center">
                                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M2.75 8.24992L11 1.83325L19.25 8.24992V18.3333C19.25 18.8195 19.0568 19.2858 18.713 19.6296C18.3692 19.9734 17.9029 20.1666 17.4167 20.1666H4.58333C4.0971 20.1666 3.63079 19.9734 3.28697 19.6296C2.94315 19.2858 2.75 18.8195 2.75 18.3333V8.24992Z"
                                                stroke="#888EA8"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path d="M8.25 20.1667V11H13.75V20.1667" stroke="#888EA8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>

                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('dashboard')}</span>
                                    </div>

                                    <div className={currentMenu === 'dashboard' ? 'rotate-90' : 'rtl:rotate-180'}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'dashboard' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/">{t('analytics')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>
                            <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <svg className="w-4 h-5 flex-none hidden" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                                <span>{t('INBOUND')}</span>
                            </h2>
                            <li className="nav-item">
                                <NavLink to="/inbound/data_process/data_input" className="group">
                                    <div className="flex items-center">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clipPath="url(#clip0_40_1194)">
                                                <path
                                                    d="M15 0H6.25V7.5H7.125L7.375 8.375L7.5 8.5V1.25H13.75V6.25H18.75V17.5H11.25L11.625 18.125L11 18.75H20V5L15 0ZM15 5V1.25L18.75 5H15ZM6.875 14.375C6.875 14.7065 6.7433 15.0245 6.50888 15.2589C6.27446 15.4933 5.95652 15.625 5.625 15.625C5.29348 15.625 4.97554 15.4933 4.74112 15.2589C4.5067 15.0245 4.375 14.7065 4.375 14.375C4.375 14.0435 4.5067 13.7255 4.74112 13.4911C4.97554 13.2567 5.29348 13.125 5.625 13.125C5.95652 13.125 6.27446 13.2567 6.50888 13.4911C6.7433 13.7255 6.875 14.0435 6.875 14.375Z"
                                                    fill="#888EA8"
                                                />
                                                <path
                                                    d="M9.875 15.5L11.25 15V13.75L9.875 13.25C9.75 12.875 9.625 12.5 9.375 12.125L10 10.875L9.125 10L7.875 10.625C7.5 10.375 7.125 10.25 6.75 10.125L6.25 8.75H5L4.5 10.125C4.125 10.25 3.75 10.375 3.375 10.625L2.125 10L1.25 10.875L1.875 12.25C1.625 12.625 1.5 13 1.375 13.375L0 13.75V15L1.375 15.5C1.5 15.875 1.625 16.25 1.875 16.625L1.25 17.875L2.125 18.75L3.5 18.125C3.875 18.375 4.25 18.5 4.625 18.625L5 20H6.25L6.75 18.625C7.125 18.5 7.5 18.375 7.875 18.125L9.125 18.75L10 17.875L9.375 16.5C9.625 16.25 9.75 15.875 9.875 15.5ZM5.625 16.875C4.25 16.875 3.125 15.75 3.125 14.375C3.125 13 4.25 11.875 5.625 11.875C7 11.875 8.125 13 8.125 14.375C8.125 15.75 7 16.875 5.625 16.875Z"
                                                    fill="#888EA8"
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_40_1194">
                                                    <rect width="20" height="20" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>

                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Data Prosess')}</span>
                                    </div>
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <ul>
                                    <li className="nav-item">
                                        <button type="button" className={`${currentMenu === 'check_product' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('check_product')}>
                                            <div className="flex items-center">
                                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M9.625 16.5107V10.0547L2.75 6.61719V16.0703L8.59375 19.0029L8.26074 20.3672L1.375 16.9297V5.07031L10.3125 0.612305L19.25 5.07031V7.9707C18.7487 8.04948 18.2904 8.21061 17.875 8.4541V6.61719L11 10.0547V15.1357L9.625 16.5107ZM8.09961 3.24414L14.373 6.83203L17.0264 5.5L10.3125 2.1377L8.09961 3.24414ZM10.3125 8.8623L12.8906 7.57324L6.61719 3.98535L3.59863 5.5L10.3125 8.8623ZM19.8516 9.625C20.1523 9.625 20.4316 9.67871 20.6895 9.78613C20.9473 9.89355 21.1764 10.0404 21.377 10.2266C21.5775 10.4128 21.7279 10.6383 21.8281 10.9033C21.9284 11.1683 21.9857 11.4512 22 11.752C22 12.0312 21.9463 12.3034 21.8389 12.5684C21.7314 12.8333 21.5775 13.0661 21.377 13.2666L13.6748 20.9688L9.625 21.9785L10.6348 17.9287L18.3369 10.2373C18.5446 10.0296 18.7773 9.87565 19.0352 9.77539C19.293 9.67513 19.5651 9.625 19.8516 9.625ZM20.3994 12.2998C20.5498 12.1494 20.625 11.9668 20.625 11.752C20.625 11.5299 20.5534 11.3509 20.4102 11.2148C20.2669 11.0788 20.0807 11.0072 19.8516 11C19.7513 11 19.6546 11.0143 19.5615 11.043C19.4684 11.0716 19.3861 11.1253 19.3145 11.2041L11.8809 18.6377L11.5156 20.0879L12.9658 19.7227L20.3994 12.2998Z"
                                                        fill="#888EA8"
                                                    />
                                                </svg>

                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Check Product')}</span>
                                            </div>
                                            <div className={currentMenu === 'check_product' ? '!rotate-90' : 'rtl:rotate-180'}>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        </button>
                                        <AnimateHeight duration={300} height={currentMenu === 'check_product' ? 'auto' : 0}>
                                            <ul className="sub-menu text-gray-500">
                                                <li>
                                                    <NavLink to="/inbound/check_product/list_data">{'Multi Check'}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/inbound/check_product/single_check">{'Single Check'}</NavLink>
                                                </li>
                                            </ul>
                                        </AnimateHeight>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/inbound/check_history" className="group">
                                            <div className="flex items-center">
                                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M11 10.7422V21.0439L10.3125 21.3877L1.375 16.9297V5.75781L10.3125 1.28906L19.25 5.75781V13.75H17.875V7.30469L11 10.7422ZM10.3125 2.83594L7.72363 4.125L14.3945 7.49805L17.0264 6.1875L10.3125 2.83594ZM9.625 19.5078V10.7422L2.75 7.30469V16.0703L9.625 19.5078ZM3.59863 6.1875L10.3125 9.53906L12.8691 8.27148L6.1875 4.89844L3.59863 6.1875ZM15.125 19.25V17.875H22V19.25H15.125ZM15.125 15.125H22V16.5H15.125V15.125ZM12.375 22V20.625H13.75V22H12.375ZM12.375 16.5V15.125H13.75V16.5H12.375ZM12.375 19.25V17.875H13.75V19.25H12.375ZM15.125 22V20.625H22V22H15.125Z"
                                                        fill="#888EA8"
                                                    />
                                                </svg>

                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Check History')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>

                            <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <svg className="w-4 h-5 flex-none hidden" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                                <span>{t('STORAGE')}</span>
                            </h2>

                            <li className="menu nav-item">
                                <NavLink to="/storage/product" className="group">
                                    <div className="flex items-center">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clipPath="url(#clip0_40_1201)">
                                                <path
                                                    d="M13.125 0.0195312L20 3.45703V11.123L18.75 10.498V4.85352L13.75 7.35352V9.87305L12.5 10.498V7.35352L7.5 4.85352V7.07031L6.25 6.44531V3.45703L13.125 0.0195312ZM13.125 6.26953L14.8535 5.40039L10.332 2.8125L8.27148 3.84766L13.125 6.26953ZM16.2012 4.73633L17.9785 3.84766L13.125 1.41602L11.6699 2.14844L16.2012 4.73633ZM11.25 11.123L10 11.748V11.7383L6.25 13.6133V18.0566L10 16.1719V17.5781L5.625 19.7656L0 16.9434V10.3418L5.625 7.5293L11.25 10.3418V11.123ZM5 18.0566V13.6133L1.25 11.7383V16.1719L5 18.0566ZM5.625 12.5293L9.22852 10.7324L5.625 8.92578L2.02148 10.7324L5.625 12.5293ZM11.25 12.5195L15.625 10.332L20 12.5195V17.666L15.625 19.8535L11.25 17.666V12.5195ZM15 18.1445V15.166L12.5 13.916V16.8945L15 18.1445ZM18.75 16.8945V13.916L16.25 15.166V18.1445L18.75 16.8945ZM15.625 14.082L17.9785 12.9004L15.625 11.7285L13.2715 12.9004L15.625 14.082Z"
                                                    fill="#888EA8"
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_40_1201">
                                                    <rect width="20" height="20" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>

                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Product')}</span>
                                    </div>
                                </NavLink>
                            </li>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'category_setting' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('category_setting')}>
                                    <div className="flex items-center">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M14 17H20M17 14V20M4 4H10V10H4V4ZM14 4H20V10H14V4ZM4 14H10V20H4V14Z"
                                                stroke="#888EA8"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>

                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Kategori Setting')}</span>
                                    </div>

                                    <div className={currentMenu === 'category_setting' ? 'rotate-90' : 'rtl:rotate-180'}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'category_setting' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/storage/categorysetting/sub_kategori">{'Sub Kategori'}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/storage/categorysetting/tag_warna">{'Tag Warna'}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'expired_product' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('expired_product')}>
                                    <div className="flex items-center">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M18 15.75V17.25H19.311C18.4793 18.4123 17.3818 19.359 16.1101 20.0113C14.8384 20.6636 13.4292 21.0026 12 21C7.03725 21 3 16.9627 3 12H1.5C1.5 17.79 6.21 22.5 12 22.5C15.2662 22.5 18.2805 20.9993 20.25 18.4913V19.5H21.75V15.75H18Z"
                                                fill="#888EA8"
                                            />
                                            <path
                                                d="M16.8787 8.72772L12.387 6.10272C12.2723 6.03566 12.1419 6.00025 12.0091 6.00012C11.8763 5.99999 11.7458 6.03514 11.631 6.10197L7.12275 8.72697C7.00938 8.79295 6.91529 8.88751 6.84989 9.00122C6.78448 9.11492 6.75004 9.24379 6.75 9.37497V14.625C6.75004 14.7561 6.78448 14.885 6.84989 14.9987C6.91529 15.1124 7.00938 15.207 7.12275 15.273L11.631 17.898C11.7425 17.9646 11.87 17.9999 12 18C12.1305 18 12.27 17.9662 12.387 17.8972L16.8787 15.2722C16.9917 15.2061 17.0854 15.1116 17.1506 14.998C17.2157 14.8845 17.25 14.7559 17.25 14.625V9.37497C17.25 9.24407 17.2157 9.11545 17.1506 9.0019C17.0854 8.88835 16.9917 8.79383 16.8787 8.72772ZM12.0082 7.61772L15.0135 9.37497L12.0082 11.1315L8.991 9.37497L12.0082 7.61772ZM8.25 10.68L11.25 12.4275V15.9412L8.25 14.1937V10.68ZM12.75 15.9487V12.4365L15.75 10.683V14.1952L12.75 15.9487Z"
                                                fill="#888EA8"
                                            />
                                            <path
                                                d="M12 1.50001C10.4107 1.49782 8.84182 1.85768 7.41236 2.55227C5.98289 3.24686 4.73043 4.25793 3.75 5.50876V4.50001H2.25V8.25001H6V6.75001H4.689C5.52073 5.5877 6.61816 4.64097 7.88988 3.98867C9.16159 3.33638 10.5708 2.99741 12 3.00001C16.9628 3.00001 21 7.03726 21 12H22.5C22.5 6.21001 17.79 1.50001 12 1.50001Z"
                                                fill="#888EA8"
                                            />
                                        </svg>

                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Expired Product')}</span>
                                    </div>

                                    <div className={currentMenu === 'expired_product' ? 'rotate-90' : 'rtl:rotate-180'}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'expired_product' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/storage/expired_product/list_product">{'List Product'}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/storage/expired_product/bundle_product">{'Bundle Product'}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/storage/expired_product/promo_product">{'Promo Product'}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <li className="menu nav-item">
                                <NavLink to="/storage/pallet" className="group">
                                    <div className="flex items-center">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M3.86379 16.455C3.00579 13.023 2.57679 11.308 3.47779 10.154C4.37779 9 6.14779 9 9.68479 9H14.3148C17.8528 9 19.6208 9 20.5218 10.154C21.4228 11.307 20.9938 13.024 20.1358 16.455C19.5898 18.638 19.3178 19.729 18.5038 20.365C17.6898 21 16.5648 21 14.3148 21H9.68479C7.43479 21 6.30979 21 5.49579 20.365C4.68179 19.729 4.40879 18.638 3.86379 16.455Z"
                                                stroke="#888EA8"
                                                strokeWidth="1.5"
                                            />
                                            <path
                                                d="M19.5 9.5L18.79 6.895C18.516 5.89 18.379 5.388 18.098 5.009C17.8178 4.63246 17.4373 4.3424 17 4.172C16.56 4 16.04 4 15 4M4.5 9.5L5.21 6.895C5.484 5.89 5.621 5.388 5.902 5.009C6.18218 4.63246 6.56269 4.3424 7 4.172C7.44 4 7.96 4 9 4"
                                                stroke="#888EA8"
                                                strokeWidth="1.5"
                                            />
                                            <path
                                                d="M9 4C9 3.73478 9.10536 3.48043 9.29289 3.29289C9.48043 3.10536 9.73478 3 10 3H14C14.2652 3 14.5196 3.10536 14.7071 3.29289C14.8946 3.48043 15 3.73478 15 4C15 4.26522 14.8946 4.51957 14.7071 4.70711C14.5196 4.89464 14.2652 5 14 5H10C9.73478 5 9.48043 4.89464 9.29289 4.70711C9.10536 4.51957 9 4.26522 9 4Z"
                                                stroke="#888EA8"
                                                strokeWidth="1.5"
                                            />
                                        </svg>

                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Pallet')}</span>
                                    </div>
                                </NavLink>
                            </li>

                            <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <svg className="w-4 h-5 flex-none hidden" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                                <span>{t('REPAIR STATION')}</span>
                            </h2>

                            <ul>
                                <li className="menu nav-item">
                                    <NavLink to="/repair/list_product_r" className="group">
                                        <div className="flex items-center">
                                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7.79167 6.41663H13.2917M10.5417 12.8333V6.87496M9.23221 19.25H3.66667C3.42355 19.25 3.19039 19.1534 3.01849 18.9815C2.84658 18.8096 2.75 18.5764 2.75 18.3333V3.20829C2.75 2.96518 2.84658 2.73202 3.01849 2.56011C3.19039 2.3882 3.42355 2.29163 3.66667 2.29163H18.3333C18.5764 2.29163 18.8096 2.3882 18.9815 2.56011C19.1534 2.73202 19.25 2.96518 19.25 3.20829V7.66192M12.375 17.4166L17.1875 10.7708L19.25 12.375L14.2083 19.25H12.375V17.4166Z"
                                                    stroke="#888EA8"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>

                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{'List Product R'}</span>
                                        </div>
                                    </NavLink>
                                </li>
                                <li className="menu nav-item">
                                    <NavLink to="/repair/list_dump" className="group">
                                        <div className="flex items-center">
                                            <svg className="group-hover:!text-primary shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    opacity="0.5"
                                                    d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    d="M18.75 8C18.75 8.41421 18.4142 8.75 18 8.75H6C5.58579 8.75 5.25 8.41421 5.25 8C5.25 7.58579 5.58579 7.25 6 7.25H18C18.4142 7.25 18.75 7.58579 18.75 8Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    d="M18.75 12C18.75 12.4142 18.4142 12.75 18 12.75H6C5.58579 12.75 5.25 12.4142 5.25 12C5.25 11.5858 5.58579 11.25 6 11.25H18C18.4142 11.25 18.75 11.5858 18.75 12Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    d="M18.75 16C18.75 16.4142 18.4142 16.75 18 16.75H6C5.58579 16.75 5.25 16.4142 5.25 16C5.25 15.5858 5.58579 15.25 6 15.25H18C18.4142 15.25 18.75 15.5858 18.75 16Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{'List Dump'}</span>
                                        </div>
                                    </NavLink>
                                </li>
                            </ul>

                            <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <svg className="w-4 h-5 flex-none hidden" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                                <span>{t('OUTBOUND')}</span>
                            </h2>
                            <ul>
                                <li className="menu nav-item">
                                    <NavLink to="/outbound/migrate" className="group">
                                        <div className="flex items-center">
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M16.25 1.25H3.75C3.41848 1.25 3.10054 1.3817 2.86612 1.61612C2.6317 1.85054 2.5 2.16848 2.5 2.5V5C2.5 5.33152 2.6317 5.64946 2.86612 5.88388C3.10054 6.1183 3.41848 6.25 3.75 6.25H9.375V10.1062L7.75625 8.49375L6.875 9.375L10 12.5L13.125 9.375L12.2437 8.49375L10.625 10.1062V6.25H16.25C16.5815 6.25 16.8995 6.1183 17.1339 5.88388C17.3683 5.64946 17.5 5.33152 17.5 5V2.5C17.5 2.16848 17.3683 1.85054 17.1339 1.61612C16.8995 1.3817 16.5815 1.25 16.25 1.25ZM3.75 2.5H6.25V5H3.75V2.5ZM16.25 5H7.5V2.5H16.25V5ZM16.25 13.75H3.75C3.41848 13.75 3.10054 13.8817 2.86612 14.1161C2.6317 14.3505 2.5 14.6685 2.5 15V17.5C2.5 17.8315 2.6317 18.1495 2.86612 18.3839C3.10054 18.6183 3.41848 18.75 3.75 18.75H16.25C16.5815 18.75 16.8995 18.6183 17.1339 18.3839C17.3683 18.1495 17.5 17.8315 17.5 17.5V15C17.5 14.6685 17.3683 14.3505 17.1339 14.1161C16.8995 13.8817 16.5815 13.75 16.25 13.75ZM3.75 15H12.5V17.5H3.75V15ZM16.25 17.5H13.75V15H16.25V17.5Z"
                                                    fill="#888EA8"
                                                />
                                            </svg>

                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{'Migrate'}</span>
                                        </div>
                                    </NavLink>
                                </li>
                                <li className="menu nav-item">
                                    <NavLink to="/outbound/sale" className="group">
                                        <div className="flex items-center">
                                            <svg className="group-hover:!text-primary shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M16.4999 6.75H19.5719C19.7577 6.75018 19.9368 6.81933 20.0745 6.94403C20.2123 7.06874 20.2988 7.24013 20.3174 7.425L20.7749 12H19.2659L18.8909 8.25H16.4999V10.5C16.4999 10.6989 16.4209 10.8897 16.2802 11.0303C16.1396 11.171 15.9488 11.25 15.7499 11.25C15.551 11.25 15.3602 11.171 15.2195 11.0303C15.0789 10.8897 14.9999 10.6989 14.9999 10.5V8.25H8.99987V10.5C8.99987 10.6989 8.92086 10.8897 8.7802 11.0303C8.63955 11.171 8.44879 11.25 8.24987 11.25C8.05096 11.25 7.8602 11.171 7.71954 11.0303C7.57889 10.8897 7.49987 10.6989 7.49987 10.5V8.25H5.10737L3.90737 20.25H11.9999V21.75H3.07787C2.97312 21.7499 2.86955 21.7278 2.77383 21.6853C2.67812 21.6427 2.59238 21.5806 2.52215 21.5028C2.45192 21.4251 2.39874 21.3335 2.36606 21.234C2.33337 21.1345 2.3219 21.0292 2.33237 20.925L3.68237 7.425C3.70095 7.24013 3.78749 7.06874 3.92522 6.94403C4.06296 6.81933 4.24207 6.75018 4.42787 6.75H7.49987V6.2265C7.49987 3.6255 9.50387 1.5 11.9999 1.5C14.4959 1.5 16.4999 3.6255 16.4999 6.2265V6.7515V6.75ZM14.9999 6.75V6.2265C14.9999 4.4355 13.6469 3 11.9999 3C10.3529 3 8.99987 4.4355 8.99987 6.2265V6.7515H14.9999V6.75ZM19.7204 18.09L17.9999 16.371V21.75C17.9999 21.9489 17.9209 22.1397 17.7802 22.2803C17.6396 22.421 17.4488 22.5 17.2499 22.5C17.051 22.5 16.8602 22.421 16.7195 22.2803C16.5789 22.1397 16.4999 21.9489 16.4999 21.75V16.371L14.7809 18.09C14.7117 18.1616 14.6289 18.2188 14.5374 18.2581C14.4459 18.2974 14.3475 18.3181 14.2479 18.3189C14.1483 18.3198 14.0496 18.3008 13.9574 18.2631C13.8652 18.2254 13.7815 18.1697 13.7111 18.0993C13.6407 18.0289 13.585 17.9451 13.5473 17.853C13.5095 17.7608 13.4906 17.662 13.4914 17.5625C13.4923 17.4629 13.513 17.3644 13.5523 17.2729C13.5916 17.1814 13.6487 17.0987 13.7204 17.0295L16.7204 14.0295C16.861 13.8889 17.0518 13.8099 17.2506 13.8099C17.4495 13.8099 17.6402 13.8889 17.7809 14.0295L20.7809 17.0295C20.8525 17.0987 20.9096 17.1814 20.9489 17.2729C20.9883 17.3644 21.0089 17.4629 21.0098 17.5625C21.0107 17.662 20.9917 17.7608 20.954 17.853C20.9163 17.9451 20.8606 18.0289 20.7902 18.0993C20.7197 18.1697 20.636 18.2254 20.5438 18.2631C20.4517 18.3008 20.3529 18.3198 20.2533 18.3189C20.1537 18.3181 20.0553 18.2974 19.9638 18.2581C19.8723 18.2188 19.7896 18.1616 19.7204 18.09Z"
                                                    fill="#888EA8"
                                                />
                                            </svg>
                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{'Sale'}</span>
                                        </div>
                                    </NavLink>
                                </li>
                                <li className="menu nav-item">
                                    <NavLink to="/outbound/setting_out" className="group">
                                        <div className="flex items-center">
                                            <svg className="group-hover:!text-primary shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M16.1621 4.49572C16.2684 4.3857 16.3272 4.23835 16.3258 4.0854C16.3245 3.93245 16.2631 3.78614 16.155 3.67799C16.0468 3.56983 15.9005 3.50849 15.7476 3.50716C15.5946 3.50583 15.4473 3.56462 15.3373 3.67088L13.9997 5.00847L12.6621 3.67088C12.6083 3.61517 12.5439 3.57073 12.4728 3.54016C12.4016 3.50958 12.325 3.49349 12.2476 3.49282C12.1701 3.49215 12.0933 3.50691 12.0216 3.53624C11.9499 3.56557 11.8848 3.60888 11.83 3.66365C11.7753 3.71842 11.7319 3.78355 11.7026 3.85524C11.6733 3.92693 11.6585 4.00375 11.6592 4.0812C11.6599 4.15865 11.676 4.2352 11.7065 4.30637C11.7371 4.37754 11.7816 4.44191 11.8373 4.49572L13.1748 5.8333L11.8373 7.17088C11.731 7.2809 11.6722 7.42825 11.6735 7.5812C11.6749 7.73415 11.7362 7.88046 11.8444 7.98861C11.9525 8.09676 12.0988 8.15811 12.2518 8.15944C12.4047 8.16077 12.5521 8.10197 12.6621 7.99572L13.9997 6.65813L15.3373 7.99572C15.4467 8.1051 15.5951 8.16651 15.7499 8.16646C15.9046 8.1664 16.053 8.10488 16.1624 7.99542C16.2718 7.88597 16.3332 7.73754 16.3331 7.5828C16.3331 7.42806 16.2716 7.27968 16.1621 7.1703L14.8245 5.8333L16.1621 4.49572Z"
                                                    fill="#888EA8"
                                                />
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M3.89877 15.4286L5.83311 16.0732V21C5.83311 21.1213 5.87092 21.2396 5.94129 21.3384C6.01165 21.4372 6.11106 21.5116 6.22569 21.5512L13.8044 24.1745C13.9241 24.2175 14.0548 24.2198 14.1759 24.1809L14.1841 24.1786L14.1929 24.1757L21.7739 21.5512C21.8885 21.5116 21.9879 21.4372 22.0583 21.3384C22.1286 21.2396 22.1664 21.1213 22.1664 21V16.0732L24.1008 15.4286C24.19 15.3989 24.2707 15.3481 24.3361 15.2805C24.4014 15.2129 24.4495 15.1305 24.4761 15.0403C24.5028 14.9501 24.5072 14.8548 24.4891 14.7626C24.471 14.6703 24.4308 14.5838 24.372 14.5104L22.0387 11.5937C21.9695 11.5076 21.8772 11.4428 21.7727 11.4071L14.1905 8.78207C14.067 8.73931 13.9326 8.73931 13.809 8.78207L6.22686 11.4071C6.12228 11.4428 6.03003 11.5076 5.96086 11.5937L3.62752 14.5104C3.56875 14.5838 3.52858 14.6703 3.51045 14.7626C3.49233 14.8548 3.49677 14.9501 3.52341 15.0403C3.55005 15.1305 3.5981 15.2129 3.66346 15.2805C3.72882 15.3481 3.80955 15.3989 3.89877 15.4286ZM12.4359 17.8342L13.4164 16.4342V22.806L6.99977 20.5847V16.4617L11.7738 18.053C11.893 18.0926 12.0219 18.0927 12.1412 18.0532C12.2605 18.0136 12.3639 17.9372 12.4359 17.8342ZM8.19969 11.9583L13.9998 13.9662L19.7999 11.9583L13.9998 9.95049L8.19969 11.9583ZM15.5637 17.8348L14.5831 16.4337V22.806L20.9998 20.5847V16.4617L16.2258 18.053C16.1065 18.0926 15.9776 18.0927 15.8583 18.0532C15.739 18.0136 15.6357 17.9367 15.5637 17.8337M6.61477 12.6443L5.06136 14.5862L8.27611 15.6578L11.7294 16.8087L13.0787 14.882L12.9999 14.8546L6.61477 12.6443ZM22.9382 14.5862L21.3848 12.6437L14.9209 14.882L16.2701 16.8087L22.9382 14.5862Z"
                                                    fill="#888EA8"
                                                />
                                            </svg>
                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{'Setting Out'}</span>
                                        </div>
                                    </NavLink>
                                </li>
                                <li className="menu nav-item">
                                    <NavLink to="/outbound/history" className="group">
                                        <div className="flex items-center">
                                            <svg className="group-hover:!text-primary shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M19.25 10.1841V4.58329C19.25 4.09706 19.0568 3.63075 18.713 3.28693C18.3692 2.94311 17.9029 2.74996 17.4167 2.74996H13.585C13.2 1.68663 12.1917 0.916626 11 0.916626C9.80833 0.916626 8.8 1.68663 8.415 2.74996H4.58333C3.575 2.74996 2.75 3.57496 2.75 4.58329V17.4166C2.75 17.9029 2.94315 18.3692 3.28697 18.713C3.63079 19.0568 4.0971 19.25 4.58333 19.25H10.1842C11.3392 20.3866 12.9158 21.0833 14.6667 21.0833C18.2142 21.0833 21.0833 18.2141 21.0833 14.6666C21.0833 12.9158 20.3867 11.3391 19.25 10.1841ZM11 2.74996C11.5042 2.74996 11.9167 3.16246 11.9167 3.66663C11.9167 4.17079 11.5042 4.58329 11 4.58329C10.4958 4.58329 10.0833 4.17079 10.0833 3.66663C10.0833 3.16246 10.4958 2.74996 11 2.74996ZM4.58333 17.4166V4.58329H6.41667V6.41663H15.5833V4.58329H17.4167V8.87329C16.5825 8.47913 15.6567 8.24996 14.6667 8.24996H6.41667V10.0833H10.175C9.625 10.6058 9.20333 11.2291 8.87333 11.9166H6.41667V13.75H8.32333C8.2775 14.0525 8.25 14.355 8.25 14.6666C8.25 15.6566 8.47917 16.5825 8.87333 17.4166H4.58333ZM14.6667 19.25C12.1367 19.25 10.0833 17.1966 10.0833 14.6666C10.0833 12.1366 12.1367 10.0833 14.6667 10.0833C17.1967 10.0833 19.25 12.1366 19.25 14.6666C19.25 17.1966 17.1967 19.25 14.6667 19.25ZM15.125 14.8958L17.7467 16.445L17.0592 17.5633L13.75 15.5833V11H15.125V14.8958Z"
                                                    fill="#888EA8"
                                                />
                                            </svg>
                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{'History'}</span>
                                        </div>
                                    </NavLink>
                                </li>
                            </ul>
                        </ul>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
