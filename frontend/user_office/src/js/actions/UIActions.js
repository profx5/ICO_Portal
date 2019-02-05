import { createAction } from 'redux-act';


export const showAccountDropdown = createAction('SHOW_ACCOUNT_DROPDOWN');
export const hideAccountDropdown = createAction('HIDE_ACCOUNT_DROPDOWN');

export const showStepsDropdown = createAction('SHOW_STEPS_DROPDOWN');
export const hideStepsDropdown = createAction('HIDE_STEPS_DROPDOWN');

export const showModal = createAction('SHOW_MODAL');
export const hideModal = createAction('HIDE_MODAL');
export const clearModalInfo = createAction('CLEAR_MODAL_INFO');

export const showCurrenciesPopup = createAction('SHOW_CURRENCIES_POPUP');
export const hideCurrenciesPopup = createAction('HIDE_CURRENCIES_POPUP');

export const showInvestOptions = createAction('SHOW_INVEST_OPTIONS');
export const hideInvestOptions = createAction('HIDE_INVEST_OPTIONS');

export const activateKycTab = createAction('ACTIVATE_KYC_TAB');

export const showSetAccountPopup = createAction('SHOW_SET_ACCOUNT_POPUP');
export const hideSetAccountPopup = createAction('HIDE_SET_ACCOUNT_POPUP');
export const changeActiveTab = createAction('CHANGE_ACTIVE_TAB', (tab => ({tab})));

export const openTransaction = createAction('OPEN_TRANSACTION', (id => ({id})));

export const setOpenedTip = createAction('SET_OPENED_TIP', (id => ({id})));

export const setStep = createAction('SET_STEP', (step => ({step})));

export const setNewTicketFiles = createAction('SET_NEW_TICKET_FILES', (files => ({files})));
export const setNewTicketFilesNull = createAction('SET_NEW_TICKET_FILES_NULL');

export const setNewCommentFiles = createAction('SET_NEW_COMMENT_FILES', (files => ({files})));
export const setNewCommentFilesNull = createAction('SET_NEW_COMMENT_FILES_NULL');

export const openMobileSidebar = createAction('OPEN_MOBILE_SIDEBAR');
export const closeMobileSidebar = createAction('CLOSE_MOBILE_SIDEBAR');
