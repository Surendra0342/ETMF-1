import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './ShadcnTable.scss';

// Sample data matching the image
const sampleData = [
  { id: 'TASK-9366', type: 'Documentation', title: 'Auctus bardus minus pariatur vobis solitudo tamquam solitudo.', status: 'Canceled', priority: 'Low' },
  { id: 'TASK-5736', type: 'Bug', title: 'Admoneo vehemens suscipit toties desidero tollo allatus blanditiis caute delibero degenero.', status: 'Canceled', priority: 'Medium' },
  { id: 'TASK-7918', type: 'Documentation', title: 'Ulterius vir amita verbum condico trepide velociter adicio autus claustrum quis aiunt aranea.', status: 'Done', priority: 'High' },
  { id: 'TASK-6498', type: 'Bug', title: 'Armarium atrocitas ustilo clam numquam defetiscor cunctatio vaco suadeo.', status: 'In Progress', priority: 'Low' },
  { id: 'TASK-9957', type: 'Documentation', title: 'Aspicio tempora aegrus sufficio delicate abstergo.', status: 'Canceled', priority: 'Low' },
  { id: 'TASK-4715', type: 'Bug', title: 'Solutio cohaero baiulus brevis animadverto adfero adeo callide calco quibusdam vapulus tergum.', status: 'Canceled', priority: 'Medium' },
  { id: 'TASK-7138', type: 'Feature', title: 'Usitas tardus aliquid comprehendo cupiditas a patria statim copiose crux.', status: 'Done', priority: 'Low' },
  { id: 'TASK-3344', type: 'Feature', title: 'Ventosus cetera turba auxilium comptus vindico dicta culpo.', status: 'Todo', priority: 'Medium' },
  { id: 'TASK-8090', type: 'Feature', title: 'Recusandae benigne acervus quis sapiente sapiente.', status: 'Backlog', priority: 'Medium' },
];

// Icons as SVG components
const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
  </svg>
);

const PlusCircleIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM7.50003 4C7.77617 4 8.00003 4.22386 8.00003 4.5V7H10.5C10.7762 7 11 7.22386 11 7.5C11 7.77614 10.7762 8 10.5 8H8.00003V10.5C8.00003 10.7761 7.77617 11 7.50003 11C7.22389 11 7.00003 10.7761 7.00003 10.5V8H4.50003C4.22389 8 4.00003 7.77614 4.00003 7.5C4.00003 7.22386 4.22389 7 4.50003 7H7.00003V4.5C7.00003 4.22386 7.22389 4 7.50003 4Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
  </svg>
);

const MixerIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.5 3C4.67157 3 4 3.67157 4 4.5C4 5.32843 4.67157 6 5.5 6C6.32843 6 7 5.32843 7 4.5C7 3.67157 6.32843 3 5.5 3ZM3 5C3.01671 5 3.03323 4.99918 3.04952 4.99758C3.28022 6.1399 4.28967 7 5.5 7C6.71033 7 7.71978 6.1399 7.95048 4.99758C7.96677 4.99918 7.98329 5 8 5H13.5C13.7761 5 14 4.77614 14 4.5C14 4.22386 13.7761 4 13.5 4H8C7.98329 4 7.96677 4.00082 7.95048 4.00242C7.71978 2.86009 6.71033 2 5.5 2C4.28967 2 3.28022 2.86009 3.04952 4.00242C3.03323 4.00082 3.01671 4 3 4H1.5C1.22386 4 1 4.22386 1 4.5C1 4.77614 1.22386 5 1.5 5H3ZM11.9505 10.9976C11.7198 12.1399 10.7103 13 9.5 13C8.28967 13 7.28022 12.1399 7.04952 10.9976C7.03323 10.9992 7.01671 11 7 11H1.5C1.22386 11 1 10.7761 1 10.5C1 10.2239 1.22386 10 1.5 10H7C7.01671 10 7.03323 10.0008 7.04952 10.0024C7.28022 8.8601 8.28967 8 9.5 8C10.7103 8 11.7198 8.8601 11.9505 10.0024C11.9668 10.0008 11.9833 10 12 10H13.5C13.7761 10 14 10.2239 14 10.5C14 10.7761 13.7761 11 13.5 11H12C11.9833 11 11.9668 10.9992 11.9505 10.9976ZM8 10.5C8 9.67157 8.67157 9 9.5 9C10.3284 9 11 9.67157 11 10.5C11 11.3284 10.3284 12 9.5 12C8.67157 12 8 11.3284 8 10.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
  </svg>
);

const DownloadIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.50005 1.04999C7.74858 1.04999 7.95005 1.25146 7.95005 1.49999V8.41359L10.1819 6.18179C10.3576 6.00605 10.6425 6.00605 10.8182 6.18179C10.994 6.35753 10.994 6.64245 10.8182 6.81819L7.81825 9.81819C7.64251 9.99392 7.35759 9.99392 7.18185 9.81819L4.18185 6.81819C4.00611 6.64245 4.00611 6.35753 4.18185 6.18179C4.35759 6.00605 4.64251 6.00605 4.81825 6.18179L7.05005 8.41359V1.49999C7.05005 1.25146 7.25152 1.04999 7.50005 1.04999ZM2.5 10C2.77614 10 3 10.2239 3 10.5V12C3 12.5539 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2239 12.2239 10 12.5 10C12.7761 10 13 10.2239 13 10.5V12C13 13.1041 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2239 2.22386 10 2.5 10Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
  </svg>
);

const PlusIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
  </svg>
);

const ArrowUpDownIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
  </svg>
);

const DotsHorizontalIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM12.5 8.625C13.1213 8.625 13.625 8.12132 13.625 7.5C13.625 6.87868 13.1213 6.375 12.5 6.375C11.8787 6.375 11.375 6.87868 11.375 7.5C11.375 8.12132 11.8787 8.625 12.5 8.625Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
  </svg>
);

// Status icons
const CheckCircleIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.49991 0.877045C3.84222 0.877045 0.877075 3.84219 0.877075 7.49988C0.877075 11.1575 3.84222 14.1227 7.49991 14.1227C11.1576 14.1227 14.1227 11.1575 14.1227 7.49988C14.1227 3.84219 11.1576 0.877045 7.49991 0.877045ZM1.82708 7.49988C1.82708 4.36686 4.3669 1.82704 7.49991 1.82704C10.6329 1.82704 13.1727 4.36686 13.1727 7.49988C13.1727 10.6329 10.6329 13.1727 7.49991 13.1727C4.3669 13.1727 1.82708 10.6329 1.82708 7.49988ZM10.1589 5.53774C10.3178 5.31191 10.2636 5.00001 10.0378 4.84109C9.81194 4.68217 9.50004 4.73642 9.34112 4.96225L6.51977 8.97154L5.35681 7.78706C5.16334 7.59002 4.84677 7.58711 4.64973 7.78058C4.45268 7.97404 4.44978 8.29061 4.64325 8.48765L6.22658 10.1003C6.33054 10.2062 6.47617 10.2604 6.62407 10.2483C6.77197 10.2363 6.90686 10.1591 6.99226 10.0377L10.1589 5.53774Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
  </svg>
);

const StopwatchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.50009 0.877014C3.84241 0.877014 0.877258 3.84216 0.877258 7.49984C0.877258 11.1575 3.84241 14.1227 7.50009 14.1227C11.1578 14.1227 14.1229 11.1575 14.1229 7.49984C14.1229 3.84216 11.1578 0.877014 7.50009 0.877014ZM1.82726 7.49984C1.82726 4.36683 4.36708 1.82701 7.50009 1.82701C10.6331 1.82701 13.1729 4.36683 13.1729 7.49984C13.1729 10.6328 10.6331 13.1727 7.50009 13.1727C4.36708 13.1727 1.82726 10.6328 1.82726 7.49984ZM8 4.50001C8 4.22387 7.77614 4.00001 7.5 4.00001C7.22386 4.00001 7 4.22387 7 4.50001V7.50001C7 7.63262 7.05268 7.75979 7.14645 7.85356L9.14645 9.85356C9.34171 10.0488 9.65829 10.0488 9.85355 9.85356C10.0488 9.6583 10.0488 9.34172 9.85355 9.14645L8 7.29291V4.50001Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
  </svg>
);

const CircleIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.877075 7.49988C0.877075 3.84219 3.84222 0.877045 7.49991 0.877045C11.1576 0.877045 14.1227 3.84219 14.1227 7.49988C14.1227 11.1575 11.1576 14.1227 7.49991 14.1227C3.84222 14.1227 0.877075 11.1575 0.877075 7.49988ZM7.49991 1.82704C4.3669 1.82704 1.82708 4.36686 1.82708 7.49988C1.82708 10.6329 4.3669 13.1727 7.49991 13.1727C10.6329 13.1727 13.1727 10.6329 13.1727 7.49988C13.1727 4.36686 10.6329 1.82704 7.49991 1.82704Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
  </svg>
);

const CrossCircledIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.877075 7.49988C0.877075 3.84219 3.84222 0.877045 7.49991 0.877045C11.1576 0.877045 14.1227 3.84219 14.1227 7.49988C14.1227 11.1575 11.1576 14.1227 7.49991 14.1227C3.84222 14.1227 0.877075 11.1575 0.877075 7.49988ZM7.49991 1.82704C4.3669 1.82704 1.82708 4.36686 1.82708 7.49988C1.82708 10.6329 4.3669 13.1727 7.49991 13.1727C10.6329 13.1727 13.1727 10.6329 13.1727 7.49988C13.1727 4.36686 10.6329 1.82704 7.49991 1.82704ZM9.85358 5.14644C10.0488 5.3417 10.0488 5.65829 9.85358 5.85355L8.20713 7.49999L9.85358 9.14644C10.0488 9.3417 10.0488 9.65829 9.85358 9.85355C9.65832 10.0488 9.34173 10.0488 9.14647 9.85355L7.50002 8.2071L5.85358 9.85355C5.65832 10.0488 5.34173 10.0488 5.14647 9.85355C4.95121 9.65829 4.95121 9.3417 5.14647 9.14644L6.79292 7.49999L5.14647 5.85355C4.95121 5.65829 4.95121 5.3417 5.14647 5.14644C5.34173 4.95118 5.65832 4.95118 5.85358 5.14644L7.50002 6.79289L9.14647 5.14644C9.34173 4.95118 9.65832 4.95118 9.85358 5.14644Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
  </svg>
);

const QuestionMarkCircledIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.877075 7.49988C0.877075 3.84219 3.84222 0.877045 7.49991 0.877045C11.1576 0.877045 14.1227 3.84219 14.1227 7.49988C14.1227 11.1575 11.1576 14.1227 7.49991 14.1227C3.84222 14.1227 0.877075 11.1575 0.877075 7.49988ZM7.49991 1.82704C4.3669 1.82704 1.82708 4.36686 1.82708 7.49988C1.82708 10.6329 4.3669 13.1727 7.49991 13.1727C10.6329 13.1727 13.1727 10.6329 13.1727 7.49988C13.1727 4.36686 10.6329 1.82704 7.49991 1.82704ZM5.5 6.75C5.5 5.50736 6.50736 4.5 7.75 4.5C8.99264 4.5 10 5.50736 10 6.75C10 7.45747 9.67579 8.0918 9.16421 8.5C8.81329 8.78044 8.625 9.14848 8.625 9.5V9.625C8.625 9.90114 8.40114 10.125 8.125 10.125C7.84886 10.125 7.625 9.90114 7.625 9.625V9.5C7.625 8.84152 7.94671 8.26848 8.41421 7.89645C8.73579 7.64645 8.95 7.2209 8.95 6.75C8.95 6.00264 8.44736 5.4 7.75 5.4C7.05264 5.4 6.55 6.00264 6.55 6.75C6.55 7.02614 6.32614 7.25 6.05 7.25C5.77386 7.25 5.55 7.02614 5.55 6.75H5.5ZM7.5 12C7.77614 12 8 11.7761 8 11.5C8 11.2239 7.77614 11 7.5 11C7.22386 11 7 11.2239 7 11.5C7 11.7761 7.22386 12 7.5 12Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
  </svg>
);

// Priority icons
const ArrowUpIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.14645 2.14645C7.34171 1.95118 7.65829 1.95118 7.85355 2.14645L11.8536 6.14645C12.0488 6.34171 12.0488 6.65829 11.8536 6.85355C11.6583 7.04882 11.3417 7.04882 11.1464 6.85355L8 3.70711V12.5C8 12.7761 7.77614 13 7.5 13C7.22386 13 7 12.7761 7 12.5V3.70711L3.85355 6.85355C3.65829 7.04882 3.34171 7.04882 3.14645 6.85355C2.95118 6.65829 2.95118 6.34171 3.14645 6.14645L7.14645 2.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
  </svg>
);

const ArrowDownIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.5 2C7.77614 2 8 2.22386 8 2.5V11.2929L11.1464 8.14645C11.3417 7.95118 11.6583 7.95118 11.8536 8.14645C12.0488 8.34171 12.0488 8.65829 11.8536 8.85355L7.85355 12.8536C7.65829 13.0488 7.34171 13.0488 7.14645 12.8536L3.14645 8.85355C2.95118 8.65829 2.95118 8.34171 3.14645 8.14645C3.34171 7.95118 3.65829 7.95118 3.85355 8.14645L7 11.2929V2.5C7 2.22386 7.22386 2 7.5 2Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
  </svg>
);

const getStatusConfig = (status) => {
  switch (status) {
    case 'Done':
      return { icon: <CheckCircleIcon />, className: 'status-done' };
    case 'Active':
      return { icon: <CheckCircleIcon />, className: 'status-done' };
    case 'In Progress':
      return { icon: <StopwatchIcon />, className: 'status-in-progress' };
    case 'Todo':
      return { icon: <CircleIcon />, className: 'status-todo' };
    case 'Canceled':
      return { icon: <CrossCircledIcon />, className: 'status-canceled' };
    case 'Inactive':
      return { icon: <CrossCircledIcon />, className: 'status-canceled' };
    case 'Backlog':
      return { icon: <QuestionMarkCircledIcon />, className: 'status-backlog' };
    default:
      return { icon: <CircleIcon />, className: 'status-todo' };
  }
};

const getPriorityConfig = (priority) => {
  switch (priority) {
    case 'High':
      return { icon: <ArrowUpIcon />, className: 'priority-high' };
    case 'Medium':
      return { icon: <ArrowRightIcon />, className: 'priority-medium' };
    case 'Low':
      return { icon: <ArrowDownIcon />, className: 'priority-low' };
    default:
      return { icon: <ArrowRightIcon />, className: 'priority-medium' };
  }
};

const defaultColumns = [
  { key: 'id', label: 'Task', sortable: true },
  { key: 'title', label: 'Title', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'priority', label: 'Priority', sortable: true },
];

const TasksTable = ({
  data = sampleData,
  columns = defaultColumns,
  title = 'Tasks',
  subtitle = "Here's a list of your tasks for this month!",
  headerAction,
  showImportButton = true,
  showExportButton = true,
  onImport,
  onExport,
  enableFilters = true,
  filterConfig = {
    status: { enabled: true, options: ['Backlog', 'Todo', 'In Progress', 'Done', 'Canceled', 'Active', 'Inactive'] },
    priority: { enabled: true, options: ['Low', 'Medium', 'High'] }
  },
  actionMenuItems = [
    { label: 'Edit', onClick: (row) => console.log('Edit', row) },
    { label: 'Make a copy', onClick: (row) => console.log('Copy', row) },
    { label: 'Favorite', onClick: (row) => console.log('Favorite', row) },
    { type: 'divider' },
    { label: 'Delete', onClick: (row) => console.log('Delete', row), danger: true }
  ],
  customCellRenderer,
  enableSelection = true,
  enableActions = true,
  searchPlaceholder = "Filter tasks...",
  rowsPerPageOptions = [5, 10, 20, 50],
  defaultRowsPerPage = 10
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedRows, setSelectedRows] = useState([]);
  const [statusFilter, setStatusFilter] = useState([]);
  const [priorityFilter, setPriorityFilter] = useState([]);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
  const [showViewDropdown, setShowViewDropdown] = useState(false);
  const [activeActionMenu, setActiveActionMenu] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  const statusDropdownRef = useRef(null);
  const priorityDropdownRef = useRef(null);
  const viewDropdownRef = useRef(null);
  const actionMenuRefs = useRef({});
  const actionButtonRefs = useRef({});
  const activeMenuRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target)) {
        setShowStatusDropdown(false);
      }
      if (priorityDropdownRef.current && !priorityDropdownRef.current.contains(event.target)) {
        setShowPriorityDropdown(false);
      }
      if (viewDropdownRef.current && !viewDropdownRef.current.contains(event.target)) {
        setShowViewDropdown(false);
      }

      // Check if click is outside the active action menu
      if (activeActionMenu !== null) {
        const buttonRef = actionButtonRefs.current[activeActionMenu];
        const menuRef = activeMenuRef.current;
        const clickedButton = buttonRef && buttonRef.contains(event.target);
        const clickedMenu = menuRef && menuRef.contains(event.target);

        if (!clickedButton && !clickedMenu) {
          setActiveActionMenu(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeActionMenu]);

  // Filter data
  const filteredData = data.filter((row) => {
    const matchesSearch = searchTerm === '' || 
      row.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(row.status);
    const matchesPriority = priorityFilter.length === 0 || priorityFilter.includes(row.priority);

    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleSelectAll = () => {
    if (selectedRows.length === paginatedData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(paginatedData.map((_, i) => i));
    }
  };

  const handleSelectRow = (index) => {
    setSelectedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const toggleStatusFilter = (status) => {
    setStatusFilter((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  const togglePriorityFilter = (priority) => {
    setPriorityFilter((prev) =>
      prev.includes(priority) ? prev.filter((p) => p !== priority) : [...prev, priority]
    );
  };

  // Get filter options from config
  const statuses = filterConfig.status?.options || [];
  const priorities = filterConfig.priority?.options || [];

  // Pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectedRows([]); // Clear selection on page change
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page
    setSelectedRows([]);
  };

  return (
    <div className="tasks-container">
      {/* Header */}
      <div className="tasks-header">
        <div className="tasks-header-left">
          <h1 className="tasks-title">{title}</h1>
          <p className="tasks-subtitle">{subtitle}</p>
        </div>
        <div className="tasks-header-right">
          {headerAction}
          {showImportButton && (
            <button className="btn-secondary" onClick={onImport}>
              <DownloadIcon />
              Import
            </button>
          )}
          {showExportButton && (
            <button className="btn-primary" onClick={onExport}>
              <PlusIcon />
              Export
            </button>
          )}
        </div>
      </div>

      {/* Toolbar */}
      <div className="tasks-toolbar">
        <div className="toolbar-left">
          <div className="search-input">
            <SearchIcon />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          {enableFilters && filterConfig.status?.enabled && (
          <div className="filter-dropdown" ref={statusDropdownRef}>
            <button
              className={`filter-btn ${statusFilter.length > 0 ? 'active' : ''}`}
              onClick={() => setShowStatusDropdown(!showStatusDropdown)}
            >
              <PlusCircleIcon />
              Status
              {statusFilter.length > 0 && (
                <span className="filter-count">{statusFilter.length}</span>
              )}
            </button>
            {showStatusDropdown && (
              <div className="dropdown-menu">
                {statuses.map((status) => (
                  <div
                    key={status}
                    className={`dropdown-item ${statusFilter.includes(status) ? 'selected' : ''}`}
                    onClick={() => toggleStatusFilter(status)}
                  >
                    <div className="checkbox-indicator">
                      {statusFilter.includes(status) && '✓'}
                    </div>
                    {getStatusConfig(status).icon}
                    <span>{status}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          )}

          {/* Priority Filter */}
          {enableFilters && filterConfig.priority?.enabled && (
          <div className="filter-dropdown" ref={priorityDropdownRef}>
            <button
              className={`filter-btn ${priorityFilter.length > 0 ? 'active' : ''}`}
              onClick={() => setShowPriorityDropdown(!showPriorityDropdown)}
            >
              <PlusCircleIcon />
              Priority
              {priorityFilter.length > 0 && (
                <span className="filter-count">{priorityFilter.length}</span>
              )}
            </button>
            {showPriorityDropdown && (
              <div className="dropdown-menu">
                {priorities.map((priority) => (
                  <div
                    key={priority}
                    className={`dropdown-item ${priorityFilter.includes(priority) ? 'selected' : ''}`}
                    onClick={() => togglePriorityFilter(priority)}
                  >
                    <div className="checkbox-indicator">
                      {priorityFilter.includes(priority) && '✓'}
                    </div>
                    {getPriorityConfig(priority).icon}
                    <span>{priority}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          )}
        </div>

        <div className="toolbar-right">
          <div className="filter-dropdown" ref={viewDropdownRef}>
            <button className="view-btn" onClick={() => setShowViewDropdown(!showViewDropdown)}>
              <MixerIcon />
              View
            </button>
            {showViewDropdown && (
              <div className="dropdown-menu dropdown-menu-right">
                <div className="dropdown-item">Toggle columns</div>
                <div className="dropdown-item">Reset view</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="tasks-table-wrapper">
        <table className="tasks-table">
          <thead>
            <tr>
              {enableSelection && (
                <th className="checkbox-cell">
                  <input
                    type="checkbox"
                    checked={selectedRows.length === paginatedData.length && paginatedData.length > 0}
                    onChange={handleSelectAll}
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={column.sortable ? 'sortable' : ''}
                  onClick={column.sortable ? () => handleSort(column.key) : undefined}
                >
                  <div className="th-content">
                    {column.label}
                    {column.sortable && <ArrowUpDownIcon />}
                  </div>
                </th>
              ))}
              {enableActions && <th className="actions-cell"></th>}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => {
              return (
                <tr key={row.id} className={selectedRows.includes(index) ? 'selected' : ''}>
                  {enableSelection && (
                    <td className="checkbox-cell">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(index)}
                        onChange={() => handleSelectRow(index)}
                      />
                    </td>
                  )}
                  {columns.map((column) => {
                    const cellValue = row[column.key];

                    // Use column-specific render function if provided
                    if (column.render) {
                      return <td key={column.key}>{column.render(row)}</td>;
                    }

                    // Use custom cell renderer if provided
                    if (customCellRenderer) {
                      const customContent = customCellRenderer(column.key, cellValue, row);
                      if (customContent !== undefined) {
                        return <td key={column.key}>{customContent}</td>;
                      }
                    }

                    // Special rendering for specific column types
                    if (column.key === 'status') {
                      const statusConfig = getStatusConfig(cellValue);
                      return (
                        <td key={column.key} className="status-cell">
                          <div className={`status-badge ${statusConfig.className}`}>
                            {statusConfig.icon}
                            <span>{cellValue}</span>
                          </div>
                        </td>
                      );
                    }

                    if (column.key === 'priority') {
                      const priorityConfig = getPriorityConfig(cellValue);
                      return (
                        <td key={column.key} className="priority-cell">
                          <div className={`priority-badge ${priorityConfig.className}`}>
                            {priorityConfig.icon}
                            <span>{cellValue}</span>
                          </div>
                        </td>
                      );
                    }

                    if (column.key === 'title') {
                      return (
                        <td key={column.key} className="title-cell">
                          <div className="title-content">
                            {row.type && (
                              <span className={`type-badge type-${row.type.toLowerCase()}`}>
                                {row.type}
                              </span>
                            )}
                            <span className="title-text">{cellValue}</span>
                          </div>
                        </td>
                      );
                    }

                    if (column.key === 'id') {
                      return (
                        <td key={column.key} className="task-cell">
                          <span className="task-id">{cellValue}</span>
                        </td>
                      );
                    }

                    // Default cell rendering
                    return (
                      <td key={column.key}>
                        {cellValue}
                      </td>
                    );
                  })}
                  {enableActions && (
                    <td className="actions-cell">
                      <div
                        className="action-menu-wrapper"
                        ref={(el) => (actionMenuRefs.current[index] = el)}
                      >
                        <button
                          className="action-btn"
                          ref={(el) => (actionButtonRefs.current[index] = el)}
                          onMouseDown={(e) => {
                            e.stopPropagation();
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (activeActionMenu === index) {
                              setActiveActionMenu(null);
                            } else {
                              const buttonRect = e.currentTarget.getBoundingClientRect();
                              const menuWidth = 160;
                              const spacing = 4;

                              // Calculate menu height based on number of items
                              // Each item is ~36px, dividers are ~1px, plus padding
                              const itemCount = actionMenuItems.filter(item => item.type !== 'divider').length;
                              const dividerCount = actionMenuItems.filter(item => item.type === 'divider').length;
                              const menuHeight = (itemCount * 36) + (dividerCount * 1) + 16; // 16px for padding

                              // Position menu below button, aligned to the right edge of button
                              let top = buttonRect.bottom + spacing;
                              let left = buttonRect.right - menuWidth;

                              // Ensure menu stays within viewport
                              const viewportWidth = window.innerWidth;
                              const viewportHeight = window.innerHeight;

                              // Adjust left if menu goes off-screen to the right
                              if (left + menuWidth > viewportWidth) {
                                left = viewportWidth - menuWidth - 10;
                              }

                              // Adjust left if menu goes off-screen to the left
                              if (left < 10) {
                                left = 10;
                              }

                              // Adjust top if menu goes off-screen at bottom
                              if (top + menuHeight > viewportHeight) {
                                top = buttonRect.top - menuHeight - spacing;
                              }

                              const pos = { top, left };
                              setMenuPosition(pos);
                              setActiveActionMenu(index);
                            }
                          }}
                        >
                          <DotsHorizontalIcon />
                        </button>
                        {activeActionMenu === index && (() => {
                          return createPortal(
                            <div
                              ref={(el) => {
                                activeMenuRef.current = el;
                              }}
                              className="dropdown-menu dropdown-menu-right action-menu"
                              style={{
                                position: 'fixed',
                                top: `${menuPosition.top}px`,
                                left: `${menuPosition.left}px`,
                                zIndex: 99999,
                                display: 'block',
                                width: '160px',
                                minWidth: '160px',
                                maxWidth: '160px'
                              }}
                              onMouseDown={(e) => {
                                e.stopPropagation();
                              }}
                            >
                            {actionMenuItems.map((item, itemIndex) => {
                              if (item.type === 'divider') {
                                return <div key={itemIndex} className="dropdown-divider"></div>;
                              }
                              return (
                                <div
                                  key={itemIndex}
                                  className={`dropdown-item ${item.danger ? 'dropdown-item-danger' : ''}`}
                                  onClick={() => {
                                    item.onClick?.(row);
                                    setActiveActionMenu(null);
                                  }}
                                >
                                  {item.label}
                                </div>
                              );
                            })}
                          </div>,
                          document.body
                        );
                        })()}
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="tasks-footer">
        <div className="footer-left">
          {enableSelection && `${selectedRows.length} of ${filteredData.length} row(s) selected.`}
        </div>
        <div className="footer-right">
          <div className="rows-per-page">
            <span>Rows per page</span>
            <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
              {rowsPerPageOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="pagination-info">
            Page {currentPage} of {totalPages || 1}
          </div>
          <div className="pagination-buttons">
            <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
              {'<<'}
            </button>
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              {'<'}
            </button>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
              {'>'}
            </button>
            <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>
              {'>>'}
            </button>
          </div>
        </div>
      </div>

      {/* Floating Selection Action Bar */}
      {enableSelection && selectedRows.length > 0 && (
        <div className="selection-action-bar">
          <button 
            className="action-bar-btn close-btn"
            onClick={() => setSelectedRows([])}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </button>
          
          <div className="selection-count">
            <span className="count-badge">{selectedRows.length}</span>
            <span className="count-text">{selectedRows.length} row{selectedRows.length > 1 ? 's' : ''} selected</span>
          </div>

          <div className="action-bar-divider"></div>

          <button className="action-bar-btn" title="Copy">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14 5.5 14H12.5C13.3284 14 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7762 12.7761 13 12.5 13H5.5C5.22386 13 5 12.7762 5 12.5V5.50002Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </button>

          <button className="action-bar-btn" title="Move">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 2C7.77614 2 8 2.22386 8 2.5V5.5C8 5.77614 7.77614 6 7.5 6C7.22386 6 7 5.77614 7 5.5V3.70711L3.85355 6.85355C3.65829 7.04882 3.34171 7.04882 3.14645 6.85355C2.95118 6.65829 2.95118 6.34171 3.14645 6.14645L6.29289 3H4.5C4.22386 3 4 2.77614 4 2.5C4 2.22386 4.22386 2 4.5 2H7.5ZM11.8536 8.14645C12.0488 8.34171 12.0488 8.65829 11.8536 8.85355L8.70711 12H10.5C10.7761 12 11 12.2239 11 12.5C11 12.7761 10.7761 13 10.5 13H7.5C7.22386 13 7 12.7761 7 12.5V9.5C7 9.22386 7.22386 9 7.5 9C7.77614 9 8 9.22386 8 9.5V11.2929L11.1464 8.14645C11.3417 7.95118 11.6583 7.95118 11.8536 8.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </button>

          <button className="action-bar-btn" title="Download">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.50005 1.04999C7.74858 1.04999 7.95005 1.25146 7.95005 1.49999V8.41359L10.1819 6.18179C10.3576 6.00605 10.6425 6.00605 10.8182 6.18179C10.994 6.35753 10.994 6.64245 10.8182 6.81819L7.81825 9.81819C7.64251 9.99392 7.35759 9.99392 7.18185 9.81819L4.18185 6.81819C4.00611 6.64245 4.00611 6.35753 4.18185 6.18179C4.35759 6.00605 4.64251 6.00605 4.81825 6.18179L7.05005 8.41359V1.49999C7.05005 1.25146 7.25152 1.04999 7.50005 1.04999ZM2.5 10C2.77614 10 3 10.2239 3 10.5V12C3 12.5539 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2239 12.2239 10 12.5 10C12.7761 10 13 10.2239 13 10.5V12C13 13.1041 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2239 2.22386 10 2.5 10Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </button>

          <button className="action-bar-btn delete-btn" title="Delete">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4H3.5C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </button>
        </div>
      )}

    </div>
  );
};

export default TasksTable;