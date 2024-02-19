import { useState, useEffect } from 'react';
import { Disclosure } from '@headlessui/react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Dropdown from '../../components/Dropdown';
import Swal from 'sweetalert2';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconMail from '../../components/Icon/IconMail';
import IconStar from '../../components/Icon/IconStar';
import IconSend from '../../components/Icon/IconSend';
import IconInfoHexagon from '../../components/Icon/IconInfoHexagon';
import IconFile from '../../components/Icon/IconFile';
import IconTrashLines from '../../components/Icon/IconTrashLines';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import IconArchive from '../../components/Icon/IconArchive';
import IconBookmark from '../../components/Icon/IconBookmark';
import IconVideo from '../../components/Icon/IconVideo';
import IconChartSquare from '../../components/Icon/IconChartSquare';
import IconUserPlus from '../../components/Icon/IconUserPlus';
import IconPlus from '../../components/Icon/IconPlus';
import IconRefresh from '../../components/Icon/IconRefresh';
import IconWheel from '../../components/Icon/IconWheel';
import IconHorizontalDots from '../../components/Icon/IconHorizontalDots';
import IconOpenBook from '../../components/Icon/IconOpenBook';
import IconBook from '../../components/Icon/IconBook';
import IconTrash from '../../components/Icon/IconTrash';
import IconRestore from '../../components/Icon/IconRestore';
import IconMenu from '../../components/Icon/IconMenu';
import IconSearch from '../../components/Icon/IconSearch';
import IconSettings from '../../components/Icon/IconSettings';
import IconHelpCircle from '../../components/Icon/IconHelpCircle';
import IconUser from '../../components/Icon/IconUser';
import IconMessage2 from '../../components/Icon/IconMessage2';
import IconUsers from '../../components/Icon/IconUsers';
import IconTag from '../../components/Icon/IconTag';
import IconPaperclip from '../../components/Icon/IconPaperclip';
import IconArrowLeft from '../../components/Icon/IconArrowLeft';
import IconPrinter from '../../components/Icon/IconPrinter';
import IconArrowBackward from '../../components/Icon/IconArrowBackward';
import IconArrowForward from '../../components/Icon/IconArrowForward';
import IconGallery from '../../components/Icon/IconGallery';
import IconFolder from '../../components/Icon/IconFolder';
import IconZipFile from '../../components/Icon/IconZipFile';
import IconDownload from '../../components/Icon/IconDownload';
import IconTxtFile from '../../components/Icon/IconTxtFile';

const Notification = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Notification'));
    });
    const [mailList, setMailList] = useState([
        {
            id: 1,
            path: 'profile-15.jpeg',
            firstName: 'Laurie',
            lastName: 'Fox',
            email: 'laurieFox@mail.com',
            date: new Date(),
            time: '2:00 PM',
            title: 'Promotion Page',
            displayDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pulvinar feugiat consequat. Duis lacus nibh, sagittis id varius vel, aliquet non augue.',
            type: 'inbox',
            isImportant: false,
            isStar: true,
            group: 'social',
            isUnread: false,
            attachments: [
                {
                    name: 'Confirm File.txt',
                    size: '450KB',
                    type: 'file',
                },
                {
                    name: 'Important Docs.xml',
                    size: '2.1MB',
                    type: 'file',
                },
            ],
            description: `
                              <p class="mail-content"> Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS. </p>
                              <div class="gallery text-center">
                                  <img alt="image-gallery" src="${'/assets/images/carousel3.jpeg'}" class="mb-4 mt-4" style="width: 250px; height: 180px;" />
                                  <img alt="image-gallery" src="${'/assets/images/carousel2.jpeg'}" class="mb-4 mt-4" style="width: 250px; height: 180px;" />
                                  <img alt="image-gallery" src="${'/assets/images/carousel1.jpeg'}" class="mb-4 mt-4" style="width: 250px; height: 180px;" />
                              </div>
                              <p>Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
                              `,
        },
        {
            id: 2,
            path: 'profile-14.jpeg',
            firstName: 'Andy',
            lastName: 'King',
            email: 'kingAndy@mail.com',
            date: new Date(),
            time: '6:28 PM',
            title: 'Hosting Payment Reminder',
            displayDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pulvinar feugiat consequat. Duis lacus nibh, sagittis id varius vel, aliquet non augue.',
            type: 'inbox',
            isImportant: false,
            isStar: false,
            group: '',
            isUnread: false,
            description: `
                              <p class="mail-content"> Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS. </p>
                              <p>Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
                              `,
        },
        {
            id: 3,
            path: '',
            firstName: 'Kristen',
            lastName: 'Beck',
            email: 'kirsten.beck@mail.com',
            date: new Date(),
            time: '11:09 AM',
            title: 'Verification Link',
            displayDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pulvinar feugiat consequat. Duis lacus nibh, sagittis id varius vel, aliquet non augue.',
            type: 'inbox',
            isImportant: false,
            isStar: false,
            group: 'social',
            isUnread: true,
            description: `
                              <p class="mail-content"> Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS. </p>
                              <p>Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
                              `,
        },
        {
            id: 4,
            path: 'profile-16.jpeg',
            firstName: 'Christian',
            lastName: '',
            email: 'christian@mail.com',
            date: '11/30/2021',
            time: '2:00 PM',
            title: 'New Updates',
            displayDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pulvinar feugiat consequat. Duis lacus nibh, sagittis id varius vel, aliquet non augue.',
            type: 'inbox',
            isImportant: false,
            isStar: false,
            group: 'private',
            isUnread: false,
            attachments: [
                {
                    name: 'update.zip',
                    size: '1.38MB',
                    type: 'zip',
                },
            ],
            description: `
                              <p class="mail-content"> Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS. </p>
                              <p>Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
                              `,
        },
        {
            id: 5,
            path: 'profile-17.jpeg',
            firstName: 'Roxanne',
            lastName: '',
            email: 'roxanne@mail.com',
            date: '11/15/2021',
            time: '2:00 PM',
            title: 'Schedular Alert',
            displayDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pulvinar feugiat consequat. Duis lacus nibh, sagittis id varius vel, aliquet non augue.',
            type: 'inbox',
            isImportant: false,
            isStar: false,
            group: 'personal',
            isUnread: true,
            description: `
                              <p class="mail-content"> Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS. </p>
                              <p>Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
                              `,
        },
        {
            id: 6,
            path: 'profile-18.jpeg',
            firstName: 'Nia',
            lastName: 'Hillyer',
            email: 'niahillyer@mail.com',
            date: '08/16/2020',
            time: '2:22 AM',
            title: 'Motion UI Kit',
            displayDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pulvinar feugiat consequat. Duis lacus nibh, sagittis id varius vel, aliquet non augue.',
            type: 'inbox',
            isImportant: true,

            isStar: true,
            group: '',
            isUnread: false,
            description: `
                              <p class="mail-content"> Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.</p>
                              <div class="gallery text-center">
                                  <img alt="image-gallery" src="${'/assets/images/carousel3.jpeg'}" class="mb-4 mt-4" style="width: 250px; height: 180px;">
                                  <img alt="image-gallery" src="${'/assets/images/carousel2.jpeg'}" class="mb-4 mt-4" style="width: 250px; height: 180px;">
                                  <img alt="image-gallery" src="${'/assets/images/carousel1.jpeg'}" class="mb-4 mt-4" style="width: 250px; height: 180px;">
                              </div>
                              <p>Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
                              `,
        },
        {
            id: 7,
            path: 'profile-19.jpeg',
            firstName: 'Iris',
            lastName: 'Hubbard',
            email: 'irishubbard@mail.com',
            date: '08/16/2020',
            time: '1:40 PM',
            title: 'Green Illustration',
            displayDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pulvinar feugiat consequat. Duis lacus nibh, sagittis id varius vel, aliquet non augue.',
            type: 'inbox',
            isImportant: true,

            isStar: true,
            group: '',
            isUnread: false,
            description: `
                              <p class="mail-content"> Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS. </p>
                              <p>Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
                              `,
        },
        {
            id: 8,
            path: '',
            firstName: 'Ernest',
            lastName: 'Reeves',
            email: 'reevesErnest@mail.com',
            date: '06/02/2020',
            time: '8:25 PM',
            title: 'Youtube',
            displayDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pulvinar feugiat consequat. Duis lacus nibh, sagittis id varius vel, aliquet non augue.',
            type: 'archive',
            isImportant: true,

            isStar: true,
            group: 'work',
            isUnread: false,
            description: `
                              <p class="mail-content"> Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS. </p>
                              <p>Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
                              `,
        },
        {
            id: 9,
            path: 'profile-20.jpeg',
            firstName: 'Info',
            lastName: 'Company',
            email: 'infocompany@mail.com',
            date: '02/10/2020',
            time: '7:00 PM',
            title: '50% Discount',
            displayDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pulvinar feugiat consequat. Duis lacus nibh, sagittis id varius vel, aliquet non augue.',
            type: 'inbox',
            isImportant: false,
            isStar: false,
            group: 'work',
            isUnread: false,
            description: `
                              <p class="mail-content"> Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS. </p>
                              <p>Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
                              `,
        },

        {
            id: 10,
            path: '',
            firstName: 'NPM',
            lastName: 'Inc',
            email: 'npminc@mail.com',
            date: '12/15/2018',
            time: '8:37 AM',
            title: 'npm Inc',
            displayDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pulvinar feugiat consequat. Duis lacus nibh, sagittis id varius vel, aliquet non augue.',
            type: 'archive',
            isImportant: false,
            isStar: false,
            group: 'personal',
            isUnread: true,
            attachments: [
                {
                    name: 'package.zip',
                    size: '450KB',
                    type: 'zip',
                },
            ],
            description: `
                              <p class="mail-content"> Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS. </p>
                              <p>Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
                              `,
        },
        {
            id: 11,
            path: 'profile-21.jpeg',
            firstName: 'Marlene',
            lastName: 'Wood',
            email: 'marlenewood@mail.com',
            date: '11/25/2018',
            time: '1:51 PM',
            title: 'eBill',
            displayDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pulvinar feugiat consequat. Duis lacus nibh, sagittis id varius vel, aliquet non augue.',
            type: 'inbox',
            isImportant: false,
            isStar: false,
            group: 'personal',
            isUnread: false,
            description: `
                              <p class="mail-content"> Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS. </p>
                              <p>Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
                              `,
        },

        {
            id: 12,
            path: '',
            firstName: 'Keith',
            lastName: 'Foster',
            email: 'kf@mail.com',
            date: '12/15/2018',
            time: '9:30 PM',
            title: 'Web Design News',
            displayDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pulvinar feugiat consequat. Duis lacus nibh, sagittis id varius vel, aliquet non augue.',
            type: 'draft',
            isImportant: false,
            isStar: false,
            group: 'personal',
            isUnread: false,
            description: `
                              <p class="mail-content"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pulvinar feugiat consequat. Duis lacus nibh, sagittis id varius vel, aliquet non augue. Vivamus sem ante, ultrices at ex a, rhoncus ullamcorper tellus. Nunc iaculis eu ligula ac consequat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum mattis urna neque, eget posuere lorem tempus non. Suspendisse ac turpis dictum, convallis est ut, posuere sem. Etiam imperdiet aliquam risus, eu commodo urna vestibulum at. Suspendisse malesuada lorem eu sodales aliquam.</p>
                              `,
        },
        {
            id: 13,
            path: '',
            firstName: 'Amy',
            lastName: 'Diaz',
            email: 'amyDiaz@mail.com',
            date: '12/15/2018',
            time: '2:00 PM',
            title: 'Ecommerce Analytics',
            displayDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pulvinar feugiat consequat. Duis lacus nibh, sagittis id varius vel, aliquet non augue.',
            type: 'draft',
            isImportant: false,
            isStar: false,
            group: 'private',
            isUnread: false,
            description: `
                              <p class="mail-content"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pulvinar feugiat consequat. Duis lacus nibh, sagittis id varius vel, aliquet non augue. Vivamus sem ante, ultrices at ex a, rhoncus ullamcorper tellus. Nunc iaculis eu ligula ac consequat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum mattis urna neque, eget posuere lorem tempus non. Suspendisse ac turpis dictum, convallis est ut, posuere sem. Etiam imperdiet aliquam risus, eu commodo urna vestibulum at. Suspendisse malesuada lorem eu sodales aliquam.</p>
                              `,
        },

        {
            id: 14,
            path: '',
            firstName: 'Alan',
            lastName: '',
            email: 'alan@mail.com',
            date: '12/16/2019',
            time: '8:45 AM',
            title: 'Mozilla Update',
            displayDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pulvinar feugiat consequat. Duis lacus nibh, sagittis id varius vel, aliquet non augue.',
            type: 'sent_mail',
            isImportant: false,
            isStar: false,
            group: 'work',
            isUnread: false,
            attachments: [
                {
                    name: 'Confirm File',
                    size: '450KB',
                    type: 'file',
                },
                {
                    name: 'Important Docs',
                    size: '2.1MB',
                    type: 'folder',
                },
                {
                    name: 'Photo.png',
                    size: '50kb',
                    type: 'image',
                },
            ],
            description: `
                              <p class="mail-content"> Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS. </p>
                              <p>Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
                              `,
        },
        {
            id: 15,
            path: '',
            firstName: 'Justin',
            lastName: 'Cross',
            email: 'justincross@mail.com',
            date: '09/14/219',
            time: '3:10 PM',
            title: 'App Project Checklist',
            displayDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pulvinar feugiat consequat. Duis lacus nibh, sagittis id varius vel, aliquet non augue.',
            type: 'sent_mail',
            isImportant: false,
            isStar: false,
            group: '',
            isUnread: false,
            attachments: [
                {
                    name: 'Important Docs',
                    size: '2.1MB',
                    type: 'folder',
                },
                {
                    name: 'Photo.png',
                    size: '50kb',
                    type: 'image',
                },
            ],
            description: `
                              <p class="mail-content"> Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS. </p>
                              <p>Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
                              `,
        },

        {
            id: 16,
            path: 'profile-21.jpeg',
            firstName: 'Alex',
            lastName: 'Gray',
            email: 'alexGray@mail.com',
            date: '08/16/2019',
            time: '10:18 AM',
            title: 'Weekly Newsletter',
            displayDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pulvinar feugiat consequat. Duis lacus nibh, sagittis id varius vel, aliquet non augue.',
            type: 'spam',
            isImportant: false,
            isStar: false,
            group: '',
            isUnread: false,
            attachments: [
                {
                    name: 'Confirm File',
                    size: '450KB',
                    type: 'file',
                },
                {
                    name: 'Important Docs',
                    size: '2.1MB',
                    type: 'folder',
                },
                {
                    name: 'Photo.png',
                    size: '50kb',
                    type: 'image',
                },
            ],
            description: `
                              <p class="mail-content"> Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS. </p>
                              <p>Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
                              `,
        },
        {
            id: 17,
            path: 'profile-22.jpeg',
            firstName: 'Info',
            lastName: 'Company',
            email: 'infocompany@mail.com',
            date: '02/10/2018',
            time: '7:00 PM',
            title: '50% Discount',
            displayDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pulvinar feugiat consequat. Duis lacus nibh, sagittis id varius vel, aliquet non augue.',
            type: 'spam',
            isImportant: false,
            isStar: false,
            group: 'work',
            isUnread: false,
            description: `
                              <p class="mail-content"> Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS. </p>
                              <p>Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
                              `,
        },
        {
            id: 18,
            path: 'profile-21.jpeg',
            firstName: 'Marlene',
            lastName: 'Wood',
            email: 'marlenewood@mail.com',
            date: '11/25/2017',
            time: '1:51 PM',
            title: 'eBill',
            displayDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pulvinar feugiat consequat. Duis lacus nibh, sagittis id varius vel, aliquet non augue.',
            type: 'spam',
            isImportant: false,
            isStar: false,
            group: 'personal',
            isUnread: false,
            description: `
                              <p class="mail-content"> Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS. </p>
                              <p>Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
                              `,
        },

        {
            id: 19,
            path: 'profile-23.jpeg',
            firstName: 'Ryan MC',
            lastName: 'Killop',
            email: 'ryanMCkillop@mail.com',
            date: '08/17/2018',
            time: '11:45 PM',
            title: 'Make it Simple',
            displayDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pulvinar feugiat consequat. Duis lacus nibh, sagittis id varius vel, aliquet non augue.',
            type: 'trash',
            isImportant: false,
            isStar: false,
            group: '',
            isUnread: false,
            description: `
                              <p class="mail-content"> Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS. </p>
                              <div class="gallery text-center">
                                  <img alt="image-gallery" src="${'/assets/images/carousel2.jpeg'}" class="mb-4 mt-4" style="width: 250px; height: 180px;">
                                  <img alt="image-gallery" src="${'/assets/images/carousel3.jpeg'}" class="mb-4 mt-4" style="width: 250px; height: 180px;">
                                  <img alt="image-gallery" src="${'/assets/images/carousel1.jpeg'}" class="mb-4 mt-4" style="width: 250px; height: 180px;">
                              </div>
                              <p>Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
                              `,
        },
        {
            id: 20,
            path: 'profile-23.jpeg',
            firstName: 'Liam',
            lastName: 'Sheldon',
            email: 'liamsheldon@mail.com',
            date: '08/17/2018 ',
            time: '11:45 PM',
            title: 'New Offers',
            displayDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pulvinar feugiat consequat. Duis lacus nibh, sagittis id varius vel, aliquet non augue.',
            type: 'trash',
            isImportant: false,
            isStar: false,
            group: '',
            isUnread: false,
            attachments: [
                {
                    name: 'Confirm File',
                    size: '450KB',
                    type: 'file',
                },
            ],
            description: `
                              <p class="mail-content"> Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS. </p>
                              <p>Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
                              `,
        },
        {
            id: 21,
            path: 'profile-21.jpeg',
            firstName: 'Porter',
            lastName: 'Taylor',
            email: 'porter.harber@wiza.info',
            date: '06/01/2020',
            time: '02:40 PM',
            title: 'Id labore ex et quam laborum',
            displayDescription: 'Laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium',
            type: 'inbox',
            isImportant: false,
            isStar: false,
            group: '',
            isUnread: false,
            description: `<p class="mail-content">Laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium</p>
                          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>`,
        },
        {
            id: 22,
            path: 'profile-22.jpeg',
            firstName: 'Brock',
            lastName: 'Mills',
            email: 'brock.gibson@farrell.biz',
            date: '09/08/2020',
            time: '04:20 AM',
            title: 'Quo vero reiciendis velit similique earum',
            displayDescription:
                'Est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et',
            type: 'inbox',
            isImportant: false,
            isStar: false,
            group: '',
            isUnread: false,
            description: `<p class="mail-content">Est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et</p>
                          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>`,
        },
        {
            id: 23,
            path: 'profile-3.jpeg',
            firstName: 'Nyost',
            lastName: 'Terry',
            email: 'nyost@yahoo.com',
            date: '04/01/2019',
            time: '02:10 AM',
            title: 'Odio adipisci rerum aut animi',
            displayDescription:
                'Quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\nomnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione',
            type: 'inbox',
            isImportant: true,
            isStar: false,
            group: 'personal',
            isUnread: false,
            description: `<p class="mail-content">Quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\nomnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione</p>
                          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>`,
        },
        {
            id: 24,
            path: 'profile-2.jpeg',
            firstName: 'Leonardo',
            lastName: 'Knox',
            email: 'leonardo61@yahoo.com',
            date: '08/08/2018',
            time: '07:50 PM',
            title: 'Alias odio sit',
            displayDescription: 'Non et atque\noccaecati deserunt quas accusantium unde odit nobis qui voluptatem\nquia voluptas consequuntur itaque dolor\net qui rerum deleniti ut occaecati',
            type: 'inbox',
            isImportant: false,
            isStar: true,
            group: '',
            isUnread: false,
            description: `<p class="mail-content">Non et atque\noccaecati deserunt quas accusantium unde odit nobis qui voluptatem\nquia voluptas consequuntur itaque dolor\net qui rerum deleniti ut occaecati</p>
                          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>`,
        },
        {
            id: 25,
            path: 'profile-24.jpeg',
            firstName: 'Melisa',
            lastName: 'Mitchell',
            email: 'melisa.legros@mayer.com',
            date: '10/03/2018',
            time: '06:40 AM',
            title: 'Vero eaque aliquid doloribus et culpa',
            displayDescription: 'Harum non quasi et ratione\ntempore iure ex voluptates in ratione\nharum architecto fugit inventore cupiditate\nvoluptates magni quo et',
            type: 'inbox',
            isImportant: true,
            isStar: true,
            group: 'work',
            isUnread: false,
            description: `<p class="mail-content">Harum non quasi et ratione\ntempore iure ex voluptates in ratione\nharum architecto fugit inventore cupiditate\nvoluptates magni quo et</p>
                          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>`,
        },
        {
            id: 26,
            path: 'profile-26.jpeg',
            firstName: 'Florida',
            lastName: 'Morgan',
            email: 'florida54@gmail.com',
            date: '05/12/2019',
            time: '09:20 PM',
            title: 'Et fugit eligendi deleniti quidem qui sint nihil autem',
            displayDescription:
                'Doloribus at sed quis culpa deserunt consectetur qui praesentium\naccusamus fugiat dicta\nvoluptatem rerum ut voluptate autem\nvoluptatem repellendus aspernatur dolorem in',
            type: 'inbox',
            isImportant: false,
            isStar: false,
            group: '',
            isUnread: false,
            description: `<p class="mail-content">Doloribus at sed quis culpa deserunt consectetur qui praesentium\naccusamus fugiat dicta\nvoluptatem rerum ut voluptate autem\nvoluptatem repellendus aspernatur dolorem in</p>
                          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>`,
        },
        {
            id: 27,
            path: 'profile-27.jpeg',
            firstName: 'Madison',
            lastName: 'King',
            email: 'madison86@yahoo.com',
            date: '12/04/2018',
            time: '10:40 PM',
            title: 'Repellat consequatur praesentium vel minus molestias voluptatum',
            displayDescription:
                'Maiores sed dolores similique labore et inventore et\nquasi temporibus esse sunt id et\neos voluptatem aliquam\naliquid ratione corporis molestiae mollitia quia et magnam dolor',
            type: 'inbox',
            isImportant: false,
            isStar: false,
            group: 'private',
            isUnread: false,
            description: `<p class="mail-content">Maiores sed dolores similique labore et inventore et\nquasi temporibus esse sunt id et\neos voluptatem aliquam\naliquid ratione corporis molestiae mollitia quia et magnam dolor</p>
                          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>`,
        },
        {
            id: 28,
            path: 'profile-30.jpeg',
            firstName: 'Paul',
            lastName: 'Lambert',
            email: 'paul.cruickshank@yahoo.com',
            date: '06/05/2018',
            time: '01:40 AM',
            title: 'Et omnis dolorem',
            displayDescription: 'Ut voluptatem corrupti velit\nad voluptatem maiores\net nisi velit vero accusamus maiores\nvoluptates quia aliquid ullam eaque',
            type: 'inbox',
            isImportant: true,
            isStar: false,
            group: '',
            isUnread: false,
            description: `<p class="mail-content">Ut voluptatem corrupti velit\nad voluptatem maiores\net nisi velit vero accusamus maiores\nvoluptates quia aliquid ullam eaque</p>
                          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>`,
        },
        {
            id: 29,
            path: 'profile-31.jpeg',
            firstName: 'Brakus',
            lastName: 'Morrison',
            email: 'brakus.heidi@gmail.com',
            date: '03/09/2018',
            time: '06:10 PM',
            title: 'Provident id voluptas',
            displayDescription: 'Sapiente assumenda molestiae atque\nadipisci laborum distinctio aperiam et ab ut omnis\net occaecati aspernatur odit sit rem expedita\nquas enim ipsam minus',
            type: 'inbox',
            isImportant: false,
            isStar: true,
            group: 'social',
            isUnread: false,
            description: `<p class="mail-content">Sapiente assumenda molestiae atque\nadipisci laborum distinctio aperiam et ab ut omnis\net occaecati aspernatur odit sit rem expedita\nquas enim ipsam minus</p>
                          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>`,
        },
        {
            id: 30,
            path: 'profile-32.jpeg',
            firstName: 'Predovic',
            lastName: 'Peake',
            email: 'predovic.arianna@kirlin.com',
            date: '05/06/2018',
            time: '09:00 AM',
            title: 'Eaque et deleniti atque tenetur ut quo ut',
            displayDescription: 'Voluptate iusto quis nobis reprehenderit ipsum amet nulla\nquia quas dolores velit et non\naut quia necessitatibus\nnostrum quaerat nulla et accusamus nisi facili',
            type: 'inbox',
            isImportant: false,
            isStar: false,
            group: 'personal',
            isUnread: false,
            description: `<p class="mail-content">Voluptate iusto quis nobis reprehenderit ipsum amet nulla\nquia quas dolores velit et non\naut quia necessitatibus\nnostrum quaerat nulla et accusamus nisi facili</p>
                          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>`,
        },
        {
            id: 31,
            path: 'profile-32.jpeg',
            firstName: 'shaylee',
            lastName: 'Buford',
            email: 'Buford@shaylee.biz',
            date: '07/03/2018',
            time: '08:15 AM',
            title: 'Ex velit ut cum eius odio ad placeat',
            displayDescription: 'Quia incidunt ut\naliquid est ut rerum deleniti iure est\nipsum quia ea sint et\nvoluptatem quaerat eaque repudiandae eveniet aut',
            type: 'inbox',
            isImportant: false,
            isStar: false,
            group: '',
            isUnread: false,
            description: `<p class="mail-content"></p>
                          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>`,
        },
        {
            id: 32,
            path: 'profile-32.jpeg',
            firstName: 'Maria',
            lastName: 'laurel',
            email: 'Maria@laurel.name',
            date: '08/03/2018',
            time: '09:30 AM',
            title: 'Dolorem architecto ut pariatur quae qui suscipit',
            displayDescription: 'Nihil ea itaque libero illo\nofficiis quo quo dicta inventore consequatur voluptas voluptatem\ncorporis sed necessitatibus velit tempore\nrerum velit et temporibus',
            type: 'inbox',
            isImportant: false,
            isStar: false,
            group: '',
            isUnread: false,
            description: `<p class="mail-content"></p>
                          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>`,
        },
        {
            id: 33,
            path: 'profile-32.jpeg',
            firstName: 'Jaeden',
            lastName: 'Towne',
            email: 'Jaeden.Towne@arlene.tv',
            date: '11/07/2018',
            time: '10:15 AM',
            title: 'Voluptatum totam vel voluptate omnis',
            displayDescription: 'Fugit harum quae vero\nlibero unde tempore\nsoluta eaque culpa sequi quibusdam nulla id\net et necessitatibus',
            type: 'inbox',
            isImportant: false,
            isStar: false,
            group: '',
            isUnread: false,
            description: `<p class="mail-content"></p>
                          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>`,
        },
        {
            id: 34,
            path: 'profile-32.jpeg',
            firstName: 'Schneider',
            lastName: 'Ethelyn',
            email: 'Ethelyn.Schneider@emelia.co.uk',
            date: '07/11/2018',
            time: '10:30 AM',
            title: 'Omnis nemo sunt ab autem',
            displayDescription: 'Omnis temporibus quasi ab omnis\nfacilis et omnis illum quae quasi aut\nminus iure ex rem ut reprehenderit\nin non fugit',
            type: 'inbox',
            isImportant: false,
            isStar: false,
            group: '',
            isUnread: false,
            description: `<p class="mail-content"></p>
                          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>`,
        },
        {
            id: 35,
            path: 'profile-32.jpeg',
            firstName: 'Anna',
            lastName: 'Georgi',
            email: 'Georgianna@florence.io',
            date: '10/10/2017',
            time: '10:45 AM',
            title: 'Repellendus sapiente omnis praesentium aliquam ipsum id molestiae omnis',
            displayDescription: 'Dolor mollitia quidem facere et\nvel est ut\nut repudiandae est quidem dolorem sed atque\nrem quia aut adipisci sunt',
            type: 'inbox',
            isImportant: false,
            isStar: false,
            group: '',
            isUnread: false,
            description: `<p class="mail-content"></p>
                          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>`,
        },
    ]);

    const defaultParams = {
        id: null,
        from: 'vristo@mail.com',
        to: '',
        cc: '',
        title: '',
        file: null,
        description: '',
        displayDescription: '',
    };

    const [isShowMailMenu, setIsShowMailMenu] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedTab, setSelectedTab] = useState('inbox');
    const [filteredMailList, setFilteredMailList] = useState<any>(mailList.filter((d) => d.type === 'inbox'));
    const [ids, setIds] = useState<any>([]);
    const [searchText, setSearchText] = useState<any>('');
    const [selectedMail, setSelectedMail] = useState<any>(null);
    const [params, setParams] = useState<any>(JSON.parse(JSON.stringify(defaultParams)));
    const [pagedMails, setPagedMails] = useState<any>([]);

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [pager] = useState<any>({
        currentPage: 1,
        totalPages: 0,
        pageSize: 10,
        startIndex: 0,
        endIndex: 0,
    });

    useEffect(() => {
        searchMails();
    }, [selectedTab, searchText, mailList]);

    const selectMail = (item: any) => {
        if (item) {
            if (item.type !== 'draft') {
                if (item && item.isUnread) {
                    item.isUnread = false;
                }
                setSelectedMail(item);
            } else {
                openMail('draft', item);
            }
        } else {
            setSelectedMail('');
        }
    };

    const setStar = (mailId: number) => {
        if (mailId) {
            let item = filteredMailList.find((d: any) => d.id === mailId);
            item.isStar = !item.isStar;
            setTimeout(() => {
                searchMails(false);
            });
        }
    };

    const setImportant = (mailId: number) => {
        if (mailId) {
            let item = filteredMailList.find((d: any) => d.id === mailId);
            item.isImportant = !item.isImportant;
            setTimeout(() => {
                searchMails(false);
            });
        }
    };

    const showTime = (item: any) => {
        const displayDt: any = new Date(item.date);
        const cDt: any = new Date();
        if (displayDt.toDateString() === cDt.toDateString()) {
            return item.time;
        } else {
            if (displayDt.getFullYear() === cDt.getFullYear()) {
                var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                return monthNames[displayDt.getMonth()] + ' ' + String(displayDt.getDate()).padStart(2, '0');
            } else {
                return String(displayDt.getMonth() + 1).padStart(2, '0') + '/' + String(displayDt.getDate()).padStart(2, '0') + '/' + displayDt.getFullYear();
            }
        }
    };

    const openMail = (type: string, item: any) => {
        if (type === 'add') {
            setIsShowMailMenu(false);
            setParams(JSON.parse(JSON.stringify(defaultParams)));
        } else if (type === 'draft') {
            let data = JSON.parse(JSON.stringify(item));
            setParams({ ...data, from: defaultParams.from, to: data.email, displayDescription: data.email });
        } else if (type === 'reply') {
            let data = JSON.parse(JSON.stringify(item));
            setParams({
                ...data,
                from: defaultParams.from,
                to: data.email,
                title: 'Re: ' + data.title,
                displayDescription: 'Re: ' + data.title,
            });
        } else if (type === 'forward') {
            let data = JSON.parse(JSON.stringify(item));
            setParams({
                ...data,
                from: defaultParams.from,
                to: data.email,
                title: 'Fwd: ' + data.title,
                displayDescription: 'Fwd: ' + data.title,
            });
        }
        setIsEdit(true);
    };

    const searchMails = (isResetPage = true) => {
        if (isResetPage) {
            pager.currentPage = 1;
        }

        let res;
        if (selectedTab === 'important') {
            res = mailList.filter((d) => d.isImportant);
        } else if (selectedTab === 'star') {
            res = mailList.filter((d) => d.isStar);
        } else if (selectedTab === 'personal' || selectedTab === 'work' || selectedTab === 'social' || selectedTab === 'private') {
            res = mailList.filter((d) => d.group === selectedTab);
        } else {
            res = mailList.filter((d) => d.type === selectedTab);
        }

        let filteredRes = res.filter(
            (d) =>
                (d.title && d.title.toLowerCase().includes(searchText)) ||
                (d.firstName && d.firstName.toLowerCase().includes(searchText)) ||
                (d.lastName && d.lastName.toLowerCase().includes(searchText)) ||
                (d.displayDescription && d.displayDescription.toLowerCase().includes(searchText))
        );

        setFilteredMailList([
            ...res.filter(
                (d) =>
                    (d.title && d.title.toLowerCase().includes(searchText)) ||
                    (d.firstName && d.firstName.toLowerCase().includes(searchText)) ||
                    (d.lastName && d.lastName.toLowerCase().includes(searchText)) ||
                    (d.displayDescription && d.displayDescription.toLowerCase().includes(searchText))
            ),
        ]);

        if (filteredRes.length) {
            pager.totalPages = pager.pageSize < 1 ? 1 : Math.ceil(filteredRes.length / pager.pageSize);
            if (pager.currentPage > pager.totalPages) {
                pager.currentPage = 1;
            }
            pager.startIndex = (pager.currentPage - 1) * pager.pageSize;
            pager.endIndex = Math.min(pager.startIndex + pager.pageSize - 1, filteredRes.length - 1);
            setPagedMails([...filteredRes.slice(pager.startIndex, pager.endIndex + 1)]);
        } else {
            setPagedMails([]);
            pager.startIndex = -1;
            pager.endIndex = -1;
        }
        clearSelection();
    };

    const saveMail = (type: any, id: any) => {
        if (!params.to) {
            showMessage('To email address is required.', 'error');
            return false;
        }
        if (!params.title) {
            showMessage('Title of email is required.', 'error');
            return false;
        }

        let maxId = 0;
        if (!params.id) {
            maxId = mailList.length ? mailList.reduce((max, character) => (character.id > max ? character.id : max), mailList[0].id) : 0;
        }
        let cDt = new Date();

        let obj: any = {
            id: maxId + 1,
            path: '',
            firstName: '',
            lastName: '',
            email: params.to,
            date: cDt.getMonth() + 1 + '/' + cDt.getDate() + '/' + cDt.getFullYear(),
            time: cDt.toLocaleTimeString(),
            title: params.title,
            displayDescription: params.displayDescription,
            type: 'draft',
            isImportant: false,
            group: '',
            isUnread: false,
            description: params.description,
            attachments: null,
        };
        if (params.file && params.file.length) {
            obj.attachments = [];
            for (let file of params.file) {
                let flObj = {
                    name: file.name,
                    size: getFileSize(file.size),
                    type: getFileType(file.type),
                };
                obj.attachments.push(flObj);
            }
        }
        if (type === 'save' || type === 'save_reply' || type === 'save_forward') {
            //saved to draft
            obj.type = 'draft';
            mailList.splice(0, 0, obj);
            searchMails();
            showMessage('Mail has been saved successfully to draft.');
        } else if (type === 'send' || type === 'reply' || type === 'forward') {
            //saved to sent mail
            obj.type = 'sent_mail';
            mailList.splice(0, 0, obj);
            searchMails();
            showMessage('Mail has been sent successfully.');
        }

        setSelectedMail(null);
        setIsEdit(false);
    };

    const getFileSize = (file_type: any) => {
        let type = 'file';
        if (file_type.includes('image/')) {
            type = 'image';
        } else if (file_type.includes('application/x-zip')) {
            type = 'zip';
        }
        return type;
    };

    const getFileType = (total_bytes: number) => {
        let size = '';
        if (total_bytes < 1000000) {
            size = Math.floor(total_bytes / 1000) + 'KB';
        } else {
            size = Math.floor(total_bytes / 1000000) + 'MB';
        }
        return size;
    };

    const clearSelection = () => {
        setIds([]);
    };

    const tabChanged = (tabType: any) => {
        setIsEdit(false);
        setIsShowMailMenu(false);
        setSelectedMail(null);
    };

    const changeValue = (e: any) => {
        const { value, id } = e.target;
        setParams({ ...params, [id]: value });
    };

    const handleCheckboxChange = (id: any) => {
        if (ids.includes(id)) {
            setIds((value: any) => value.filter((d: any) => d !== id));
        } else {
            setIds([...ids, id]);
        }
    };

    const closeMsgPopUp = () => {
        setIsEdit(false);
        setSelectedTab('inbox');
        searchMails();
    };

    const showMessage = (msg = '', type = 'success') => {
        const toast: any = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            customClass: { container: 'toast' },
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: '10px 20px',
        });
    };

    return (
        <div>
            <div className="flex gap-5 relative sm:h-[calc(100vh_-_150px)] h-full">
                <div
                    className={`overlay bg-black/60 z-[5] w-full h-full rounded-md absolute hidden ${isShowMailMenu ? '!block xl:!hidden' : ''}`}
                    onClick={() => setIsShowMailMenu(!isShowMailMenu)}
                ></div>
                <div
                    className={`panel xl:block p-4 dark:gray-50 w-[250px] max-w-full flex-none space-y-3 xl:relative absolute z-10 xl:h-auto h-full hidden ltr:xl:rounded-r-md ltr:rounded-r-none rtl:xl:rounded-l-md rtl:rounded-l-none overflow-hidden ${
                        isShowMailMenu ? '!block' : ''
                    }`}
                >
                    <div className="flex flex-col h-full pb-16">
                        <div className="pb-5">
                            <button className="btn btn-primary w-full" type="button" onClick={() => openMail('add', null)} disabled>
                                New Message
                            </button>
                        </div>
                        <PerfectScrollbar className="relative ltr:pr-3.5 rtl:pl-3.5 ltr:-mr-3.5 rtl:-ml-3.5 h-full grow">
                            <div className="space-y-1">
                                <button
                                    type="button"
                                    className={`w-full flex justify-between items-center p-2 hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10 ${
                                        !isEdit && selectedTab === 'inbox' ? 'bg-gray-100 dark:text-primary text-primary dark:bg-[#181F32]' : ''
                                    }`}
                                    onClick={() => {
                                        setSelectedTab('inbox');
                                        tabChanged('inbox');
                                    }}
                                >
                                    <div className="flex items-center">
                                        <IconMail className="w-5 h-5 shrink-0" />
                                        <div className="ltr:ml-3 rtl:mr-3">Inbox</div>
                                    </div>
                                    <div className="bg-primary-light dark:bg-[#060818] rounded-md py-0.5 px-2 font-semibold whitespace-nowrap">
                                        {mailList && mailList.filter((d) => d.type === 'inbox').length}
                                    </div>
                                </button>
                                <div className="h-px border-b border-white-light dark:border-[#1b2e4b]"></div>
                            </div>
                        </PerfectScrollbar>
                    </div>
                </div>

                <div className="panel p-0 flex-1 overflow-x-hidden h-full">
                    {!selectedMail && !isEdit && (
                        <div className="flex flex-col h-full">
                            <div className="flex flex-wrap flex-col md:flex-row xl:w-auto justify-between items-center px-4 pb-4">
                                <div className="mt-4 md:flex-auto flex-1">
                                    <div className="flex items-center md:justify-end justify-center">
                                        <div className="ltr:mr-3 rtl:ml-3">{pager.startIndex + 1 + '-' + (pager.endIndex + 1) + ' of ' + filteredMailList.length}</div>
                                        <button
                                            type="button"
                                            disabled={pager.currentPage === 1}
                                            className="bg-[#f4f4f4] rounded-md p-1 enabled:hover:bg-primary-light dark:bg-white-dark/20 enabled:dark:hover:bg-white-dark/30 ltr:mr-3 rtl:ml-3 disabled:opacity-60 disabled:cursor-not-allowed"
                                            onClick={() => {
                                                pager.currentPage--;
                                                searchMails(false);
                                            }}
                                        >
                                            <IconCaretDown className="w-5 h-5 rtl:-rotate-90 rotate-90" />
                                        </button>
                                        <button
                                            type="button"
                                            disabled={pager.currentPage === pager.totalPages}
                                            className="bg-[#f4f4f4] rounded-md p-1 enabled:hover:bg-primary-light dark:bg-white-dark/20 enabled:dark:hover:bg-white-dark/30 disabled:opacity-60 disabled:cursor-not-allowed"
                                            onClick={() => {
                                                pager.currentPage++;
                                                searchMails(false);
                                            }}
                                        >
                                            <IconCaretDown className="w-5 h-5 rtl:rotate-90 -rotate-90" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="h-px border-b border-white-light dark:border-[#1b2e4b]"></div>

                            {pagedMails.length ? (
                                <div className="table-responsive grow overflow-y-auto sm:min-h-[300px] min-h-[400px]">
                                    <table className="table-hover">
                                        <tbody>
                                            {pagedMails.map((mail: any) => {
                                                return (
                                                    <tr key={mail.id} className="cursor-pointer" onClick={() => selectMail(mail)}>
                                                        <td>
                                                            <div className="flex items-center whitespace-nowrap">
                                                                <div className="ltr:mr-3 rtl:ml-3">
                                                                    {ids.includes(mail.id)}
                                                                    <input
                                                                        type="checkbox"
                                                                        id={`chk-${mail.id}`}
                                                                        value={mail.id}
                                                                        checked={ids.length ? ids.includes(mail.id) : false}
                                                                        onChange={() => handleCheckboxChange(mail.id)}
                                                                        onClick={(event) => event.stopPropagation()}
                                                                        className="form-checkbox"
                                                                    />
                                                                </div>
                                                                <div className="ltr:mr-3 rtl:ml-3">
                                                                    <Tippy content="Star">
                                                                        <button
                                                                            type="button"
                                                                            className={`enabled:hover:text-warning disabled:opacity-60 flex items-center ${mail.isStar ? 'text-warning' : ''}`}
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                setStar(mail.id);
                                                                            }}
                                                                            disabled={selectedTab === 'trash'}
                                                                        >
                                                                            <IconStar className={mail.isStar ? 'fill-warning' : ''} />
                                                                        </button>
                                                                    </Tippy>
                                                                </div>
                                                                <div className="ltr:mr-3 rtl:ml-3">
                                                                    <Tippy content="Important">
                                                                        <button
                                                                            type="button"
                                                                            className={`enabled:hover:text-primary disabled:opacity-60 rotate-90 flex items-center ${
                                                                                mail.isImportant ? 'text-primary' : ''
                                                                            }`}
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                setImportant(mail.id);
                                                                            }}
                                                                            disabled={selectedTab === 'trash'}
                                                                        >
                                                                            <IconBookmark bookmark={false} className={`w-4.5 h-4.5 ${mail.isImportant && 'fill-primary'}`} />
                                                                        </button>
                                                                    </Tippy>
                                                                </div>
                                                                <div
                                                                    className={`dark:text-gray-300 whitespace-nowrap font-semibold ${
                                                                        !mail.isUnread ? 'text-gray-500 dark:text-gray-500 font-normal' : ''
                                                                    }`}
                                                                >
                                                                    {mail.firstName ? mail.firstName + ' ' + mail.lastName : mail.email}
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="font-medium text-white-dark overflow-hidden min-w-[300px] line-clamp-1">
                                                                <span className={`${mail.isUnread ? 'text-gray-800 dark:text-gray-300 font-semibold' : ''}`}>
                                                                    <span>{mail.title}</span> &minus;
                                                                    <span> {mail.displayDescription}</span>
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="flex items-center">
                                                                <div
                                                                    className={`w-2 h-2 rounded-full ${
                                                                        (mail.group === 'personal' && 'bg-primary') ||
                                                                        (mail.group === 'work' && 'bg-warning') ||
                                                                        (mail.group === 'social' && 'bg-success') ||
                                                                        (mail.group === 'private' && 'bg-danger')
                                                                    }`}
                                                                ></div>
                                                                {mail.attachments && (
                                                                    <div className="ltr:ml-4 rtl:mr-4">
                                                                        <IconPaperclip />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td className="whitespace-nowrap font-medium ltr:text-right rtl:text-left">{showTime(mail)}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="grid place-content-center min-h-[300px] font-semibold text-lg h-full">No data available</div>
                            )}
                        </div>
                    )}

                    {selectedMail && !isEdit && (
                        <div>
                            <div className="flex items-center justify-between flex-wrap p-4">
                                <div className="flex items-center">
                                    <button type="button" className="ltr:mr-2 rtl:ml-2 hover:text-primary" onClick={() => setSelectedMail(null)}>
                                        <IconArrowLeft className="w-5 h-5 rotate-180" />
                                    </button>
                                    <h4 className="text-base md:text-lg font-medium ltr:mr-2 rtl:ml-2">{selectedMail.title}</h4>
                                    <div className="badge bg-info hover:top-0">{selectedMail.type}</div>
                                </div>
                                <div>
                                    <Tippy content="Print">
                                        <button type="button">
                                            <IconPrinter />
                                        </button>
                                    </Tippy>
                                </div>
                            </div>
                            <div className="h-px border-b border-white-light dark:border-[#1b2e4b]"></div>
                            <div className="p-4 relative">
                                <div className="flex flex-wrap">
                                    <div className="flex-shrink-0 ltr:mr-2 rtl:ml-2">
                                        {selectedMail.path ? (
                                            <img src={`/assets/images/${selectedMail.path}`} className="h-12 w-12 rounded-full object-cover" alt="avatar" />
                                        ) : (
                                            <div className="border border-gray-300 dark:border-gray-800 rounded-full p-3">
                                                <IconUser className="w-5 h-5" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="ltr:mr-2 rtl:ml-2 flex-1">
                                        <div className="flex items-center">
                                            <div className="text-lg ltr:mr-4 rtl:ml-4 whitespace-nowrap">
                                                {selectedMail.firstName ? selectedMail.firstName + ' ' + selectedMail.lastName : selectedMail.email}
                                            </div>
                                            {selectedMail.group && (
                                                <div className="ltr:mr-4 rtl:ml-4">
                                                    <Tippy content={selectedMail.group} className="capitalize">
                                                        <div
                                                            className={`w-2 h-2 rounded-full ${
                                                                (selectedMail.group === 'personal' && 'bg-primary') ||
                                                                (selectedMail.group === 'work' && 'bg-warning') ||
                                                                (selectedMail.group === 'social' && 'bg-success') ||
                                                                (selectedMail.group === 'private' && 'bg-danger')
                                                            }`}
                                                        ></div>
                                                    </Tippy>
                                                </div>
                                            )}
                                            <div className="text-white-dark whitespace-nowrap">1 days ago</div>
                                        </div>
                                        <div className="text-white-dark flex items-center">
                                            <div className="ltr:mr-1 rtl:ml-1">{selectedMail.type === 'sent_mail' ? selectedMail.email : 'to me'}</div>
                                            <div className="dropdown">
                                                <Dropdown
                                                    offset={[0, 5]}
                                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                                    btnClassName="hover:text-primary flex items-center"
                                                    button={<IconCaretDown className="w-5 h-5" />}
                                                >
                                                    <ul className="sm:w-56">
                                                        <li>
                                                            <div className="flex items-center px-4 py-2">
                                                                <div className="text-white-dark ltr:mr-2 rtl:ml-2 w-1/4">From:</div>
                                                                <div className="flex-1">{selectedMail.type === 'sent_mail' ? 'vristo@gmail.com' : selectedMail.email}</div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="flex items-center px-4 py-2">
                                                                <div className="text-white-dark ltr:mr-2 rtl:ml-2 w-1/4">To:</div>
                                                                <div className="flex-1">{selectedMail.type !== 'sent_mail' ? 'vristo@gmail.com' : selectedMail.email}</div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="flex items-center px-4 py-2">
                                                                <div className="text-white-dark ltr:mr-2 rtl:ml-2 w-1/4">Date:</div>
                                                                <div className="flex-1">{selectedMail.date + ', ' + selectedMail.time}</div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="flex items-center px-4 py-2">
                                                                <div className="text-white-dark ltr:mr-2 rtl:ml-2 w-1/4">Subject:</div>
                                                                <div className="flex-1">{selectedMail.title}</div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </Dropdown>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-center space-x-3 rtl:space-x-reverse">
                                            <Tippy content="Star">
                                                <button
                                                    type="button"
                                                    className={`enabled:hover:text-warning disabled:opacity-60 ${selectedMail.isStar ? 'text-warning' : ''}`}
                                                    onClick={() => setStar(selectedMail.id)}
                                                    disabled={selectedTab === 'trash'}
                                                >
                                                    <IconStar className={selectedMail.isStar ? 'fill-warning' : ''} />
                                                </button>
                                            </Tippy>
                                            <Tippy content="Important">
                                                <button
                                                    type="button"
                                                    className={`enabled:hover:text-primary disabled:opacity-60 ${selectedMail.isImportant ? 'text-primary' : ''}`}
                                                    onClick={() => setImportant(selectedMail.id)}
                                                    disabled={selectedTab === 'trash'}
                                                >
                                                    <IconBookmark bookmark={false} className={`w-4.5 h-4.5 rotate-90 ${selectedMail.isImportant && 'fill-primary'}`} />
                                                </button>
                                            </Tippy>
                                            <Tippy content="Reply">
                                                <button type="button" className="hover:text-info" onClick={() => openMail('reply', selectedMail)}>
                                                    <IconArrowBackward className="rtl:hidden" />
                                                    <IconArrowForward className="ltr:hidden" />
                                                </button>
                                            </Tippy>
                                            <Tippy content="Forward">
                                                <button type="button" className="hover:text-info" onClick={() => openMail('forward', selectedMail)}>
                                                    <IconArrowBackward className="ltr:hidden" />
                                                    <IconArrowForward className="rtl:hidden" />
                                                </button>
                                            </Tippy>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="mt-8 prose dark:prose-p:text-white prose-p:text-sm md:prose-p:text-sm max-w-full prose-img:inline-block prose-img:m-0"
                                    dangerouslySetInnerHTML={{ __html: selectedMail.description }}
                                ></div>
                                <p className="mt-4">Best Regards,</p>
                                <p>{selectedMail.firstName + ' ' + selectedMail.lastName}</p>

                                {selectedMail.attachments && (
                                    <div className="mt-8">
                                        <div className="text-base mb-4">Attachments</div>
                                        <div className="h-px border-b border-white-light dark:border-[#1b2e4b]"></div>
                                        <div className="flex items-center flex-wrap mt-6">
                                            {selectedMail.attachments.map((attachment: any, i: number) => {
                                                return (
                                                    <button
                                                        key={i}
                                                        type="button"
                                                        className="flex items-center ltr:mr-4 rtl:ml-4 mb-4 border border-white-light dark:border-[#1b2e4b] rounded-md hover:text-primary hover:border-primary transition-all duration-300 px-4 py-2.5 relative group"
                                                    >
                                                        {attachment.type === 'image' && <IconGallery />}
                                                        {attachment.type === 'folder' && <IconFolder />}
                                                        {attachment.type === 'zip' && <IconZipFile />}
                                                        {attachment.type !== 'zip' && attachment.type !== 'image' && attachment.type !== 'folder' && <IconTxtFile className="w-5 h-5" />}

                                                        <div className="ltr:ml-3 rtl:mr-3">
                                                            <p className="text-xs text-primary font-semibold">{attachment.name}</p>
                                                            <p className="text-[11px] text-gray-400 dark:text-gray-600">{attachment.size}</p>
                                                        </div>
                                                        <div className="bg-dark-light/40 z-[5] w-full h-full absolute ltr:left-0 rtl:right-0 top-0 rounded-md hidden group-hover:block"></div>
                                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full p-1 btn btn-primary hidden group-hover:block z-10">
                                                            <IconDownload className="w-4.5 h-4.5" />
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {isEdit && (
                        <div className="relative">
                            <div className="py-4 px-6 flex items-center">
                                <button type="button" className="xl:hidden hover:text-primary block ltr:mr-3 rtl:ml-3" onClick={() => setIsShowMailMenu(!isShowMailMenu)}>
                                    <IconMenu />
                                </button>
                                <h4 className="text-lg text-gray-600 dark:text-gray-400 font-medium">Message</h4>
                            </div>
                            <div className="h-px bg-gradient-to-l from-indigo-900/20 via-black dark:via-white to-indigo-900/20 opacity-[0.1]"></div>
                            <form className="p-6 grid gap-6">
                                <div>
                                    <input
                                        id="to"
                                        type="text"
                                        className="form-input"
                                        placeholder="Enter To"
                                        defaultValue={params.to}
                                        onChange={(e) => {
                                            changeValue(e);
                                        }}
                                    />
                                </div>

                                <div>
                                    <input id="cc" type="text" className="form-input" placeholder="Enter Cc" defaultValue={params.cc} onChange={(e) => changeValue(e)} />
                                </div>

                                <div>
                                    <input id="title" type="text" className="form-input" placeholder="Enter Subject" defaultValue={params.title} onChange={(e) => changeValue(e)} />
                                </div>

                                <div className="h-fit">
                                    <ReactQuill
                                        theme="snow"
                                        value={params.description || ''}
                                        defaultValue={params.description || ''}
                                        onChange={(content, delta, source, editor) => {
                                            params.description = content;
                                            params.displayDescription = editor.getText();
                                            setParams({
                                                ...params,
                                            });
                                        }}
                                        style={{ minHeight: '200px' }}
                                    />
                                </div>

                                <div>
                                    <input
                                        type="file"
                                        className="form-input file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:bg-primary/90 ltr:file:mr-5 rtl:file:ml-5 file:text-white file:hover:bg-primary"
                                        multiple
                                        accept="image/*,.zip,.pdf,.xls,.xlsx,.txt.doc,.docx"
                                        required
                                    />
                                </div>
                                <div className="flex items-center ltr:ml-auto rtl:mr-auto mt-8">
                                    <button type="button" className="btn btn-outline-danger ltr:mr-3 rtl:ml-3" onClick={closeMsgPopUp}>
                                        Close
                                    </button>
                                    <button type="button" className="btn btn-success ltr:mr-3 rtl:ml-3" onClick={() => saveMail('save', null)}>
                                        Save
                                    </button>
                                    <button type="button" className="btn btn-primary" onClick={() => saveMail('send', params.id)}>
                                        Send
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Notification;
