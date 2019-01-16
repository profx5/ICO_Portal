import {createReducer} from 'redux-act';
import * as actions from 'js/actions/UIActions';
import {Map} from 'immutable';


const initialState = Map({
    accountDropdownShown: false,
    stepsDropdownShown: false,
    showInvestOptions: false,
    showSetAccountPopup: false,
    activeSupportTab: 1,
    activeKycTab: 1,
    showCurrenciesPopup: false,
    openedTransaction: null,
    openedTip: null,
    step: 1,
    newTicketFiles: [],
    newCommentFiles: [],
    openedModalId: null,
    modalOpened: false,
    modalHead: null,
    modalContent: null,
    mobileSidebarOpened: false
});


export const UIStateReducer = createReducer({
    [actions.showAccountDropdown]: (state = initialState) => state.set("accountDropdownShown", true),
    [actions.hideAccountDropdown]: (state = initialState) => state.set("accountDropdownShown", false),
    [actions.showStepsDropdown]: (state = initialState) => state.set("stepsDropdownShown", true),
    [actions.hideStepsDropdown]: (state = initialState) => state.set("stepsDropdownShown", false),
    [actions.showModal]: (state = initialState, payload) => {
        if (payload.id) {
            return state.set('modalOpened', true).set('openedModalId', payload.id).set('modalHead', null).set('modalContent', null);
        }
        return state.merge({
            ...payload
        }).set('modalOpened', true)
    },
    [actions.hideModal]: (state = initialState, payload) => {
        return state.set('openedModalId', null).set('modalHead', null).set('modalContent', null).set('modalOpened', false)
    },
    [actions.showInvestOptions]: (state = initialState) => state.set("showInvestOptions", true),
    [actions.hideInvestOptions]: (state = initialState) => state.set("showInvestOptions", false),
    [actions.showSetAccountPopup]: (state = initialState) => state.set("showSetAccountPopup", true),
    [actions.hideSetAccountPopup]: (state = initialState) => state.set("showSetAccountPopup", false),
    [actions.showCurrenciesPopup]: (state = initialState) => state.set("showCurrenciesPopup", true),
    [actions.hideCurrenciesPopup]: (state = initialState) => state.set("showCurrenciesPopup", false),
    [actions.changeActiveTab]: (state = initialState, payload) => state.set("activeSupportTab", payload.tab),
    [actions.activateKycTab]: (state = initialState, payload) => state.set('activeKycTab', payload.id),
    [actions.openTransaction]: (state = initialState, payload) => state.set('openedTransaction', payload.id),
    [actions.setOpenedTip]: (state = initialState, payload) => state.set('openedTip', payload.id),
    [actions.setStep]: (state = initialState, payload) => state.set('step', payload.step),
    [actions.setNewTicketFiles]: (state = initialState, payload) => state.set('newTicketFiles', payload.files),
    [actions.setNewTicketFilesNull]: (state = initialState) => state.set('newTicketFiles', []),
    [actions.setNewCommentFiles]: (state = initialState, payload) => state.set('newCommentFiles', payload.files),
    [actions.setNewCommentFilesNull]: (state = initialState) => state.set('newCommentFiles', []),
    [actions.openMobileSidebar]: (state = initialState) => state.set('mobileSidebarOpened', true),
    [actions.closeMobileSidebar]: (state = initialState) => state.set('mobileSidebarOpened', false),
}, initialState);


