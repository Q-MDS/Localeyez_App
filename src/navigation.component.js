import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import OnboardingStart from './pages/onboarding/Start';
import OnboardingChoose from './pages/onboarding/Choose';
/**
 * Business Pages
*/
import LoginBusiness from './pages/business/login/Login';
import SignupBusinessStepOne from './pages/business/signup/StepOne';
import SignupBusinessStepTwo from './pages/business/signup/StepTwo';
import SignupBusinessStepThree from './pages/business/signup/StepThree';
import SignupBusinessStepFour from './pages/business/signup/StepFour';
import BusProfProHome from './pages/business/profile/promos/Home';




import Menu from './pages/Menu';
import Login from './pages/Login';
/**
 * Admin Pages
*/
import AdminNewBusinessHome from './pages/admin/new_businesses/Home';




/**
 * Shopper Pages
*/
import ShopperHome from './pages/shopper/Home';

import AdminLogin from './pages/admin/login/Login';
import AdminNewBusinessView from './pages/admin/new_businesses/NewView';
import AdminAllBusinessHome from './pages/admin/all_businesses/Home';
import AdminAllBusinessView from './pages/admin/all_businesses/AllView';
import AdminSupportHome from './pages/admin/support/Home';
import AdminSupportView from './pages/admin/support/SupportView';


import BusProfProAdd from './pages/business/profile/promos/Add';
import BusProfProEdit from './pages/business/profile/promos/Edit';
import BusProfProDelete from './pages/business/profile/promos/Delete';
import BusProProAddEditBack from './pages/business/profile/promos/BackMessage';
import BusProfEvtAdd from './pages/business/profile/events/Add';
import BusProfEvtEdit from './pages/business/profile/events/Edit';
import BusProfEvtDelete from './pages/business/profile/events/Delete';
import BusProfEvtAddEditBack from './pages/business/profile/events/BackMessage';
import BusProfEdit from './pages/business/profile/edit/business_profile/Edit';
import BusProfSectorsEdit from './pages/business/profile/edit/business_sectors/Edit';
import BusProfSectorsAdd from './pages/business/profile/edit/business_sectors/Add';
import ReviewList from './pages/business/reviews/List';
import ReviewView from './pages/business/reviews/View';
import ContactForm from './pages/business/contact_admin/ContactForm';
import ContactConfirm from './pages/business/contact_admin/ContactConfirm';
import BusinessDashboard from './pages/business/dashboard/Dashboard';
import BusDashNoti from './pages/business/dashboard/notifications/List';
import BusDashNotiView from './pages/business/dashboard/notifications/View';
import BusDashAccHome from './pages/business/dashboard/account/Home';
import BusDashAccEdit from './pages/business/dashboard/account/Edit';
import BusDashAccPricing from './pages/business/dashboard/account/Pricing';
import BusDashAccSecurity from './pages/business/dashboard/account/Security';
import BusDashAccClose from './pages/business/dashboard/account/Close';
import LoginUser from './pages/shopper/login/Login';
import SignupUserStepOne from './pages/shopper/signup/StepOne';
import SignupUserStepTwo from './pages/shopper/signup/StepTwo';
import SignupUserChoose from './pages/shopper/signup/pricing/Choose';
import SignupUserFreeOne from './pages/shopper/signup/pricing/FreeStepOne';
import SignupUserFreeTwo from './pages/shopper/signup/pricing/FreeStepTwo';
import SignupUserMonthlyOne from './pages/shopper/signup/pricing/MonthlyStepOne';
import SignupUserMonthlyTwo from './pages/shopper/signup/pricing/MonthlyStepTwo';
import SignupUserMonthlyThree from './pages/shopper/signup/pricing/MonthlyStepThree';

import ShopperAccHome from './pages/shopper/account/Home';
import ShopperAccEdit from './pages/shopper/account/Edit';
import ShopperAccIntHome from './pages/shopper/account/interests/Home';
import ShopperAccIntAdd from './pages/shopper/account/interests/Add';
import ShopperAccSecurity from './pages/shopper/account/security/Home';
import ShopperAccPlanMem from './pages/shopper/account/pricing_plan/member/Home';
import ShopperAccPlanMemCancel from './pages/shopper/account/pricing_plan/member/Cancel';
import ShopperAccPlanMemUpCardDet from './pages/shopper/account/pricing_plan/member/CardDetails';
import ShopperAccPlanMemUpdCardDetDone from './pages/shopper/account/pricing_plan/member/CardDetailsConfirm';
import ShopperAccPlanFree from './pages/shopper/account/pricing_plan/free/Home';
import ShopperAccPlanFreeUpgrade from './pages/shopper/account/pricing_plan/free/Upgrade';
import ShopperAccPlanFreeCardDet from './pages/shopper/account/pricing_plan/free/CardDetails';
import ShopperAccPlanFreeCardDetDone from './pages/shopper/account/pricing_plan/free/CardDetailsConfirm';
import ShopperAccClose from './pages/shopper/account/Close';
import ShopperNotiList from './pages/shopper/notifications/List';
import ShopperNotiView from './pages/shopper/notifications/ViewNotification';
import ShopperVerified from './pages/shopper/account/Verified';
import ShopperContactAdmin from './pages/shopper/contact_admin/ContactForm';
import ShopperContactConfirm from './pages/shopper/contact_admin/ContactConfirm';
import ShopperReviewList from './pages/shopper/reviews/ReviewList';
import ShopperReviewView from './pages/shopper/reviews/ReviewView';
import CatTravel from './pages/shopper/categories/Travel';
import CatProperty from './pages/shopper/categories/Property';
import CatCommunity from './pages/shopper/categories/Community';
import CatEducation from './pages/shopper/categories/Education';
import CatHealth from './pages/shopper/categories/Health';
import CatShopping from './pages/shopper/categories/Shopping';
import CatEntertainment from './pages/shopper/categories/Entertainment';
import CatServices from './pages/shopper/categories/Services';
import Search from './pages/shopper/search/Home';

const {Navigator, Screen} = createStackNavigator();

const HomeNavigator = () => (
  <Navigator screenOptions={{headerShown: false}}>
    <Screen name="OnboardingStart" component={OnboardingStart} />
    <Screen name="OnboardingChoose" component={OnboardingChoose} />
    <Screen name="LoginBusiness" component={LoginBusiness} />
    <Screen name="SignupBusinessStepOne" component={SignupBusinessStepOne} />
    <Screen name="SignupBusinessStepTwo" component={SignupBusinessStepTwo} />
    <Screen name="SignupBusinessStepThree" component={SignupBusinessStepThree} />
    <Screen name="SignupBusinessStepFour" component={SignupBusinessStepFour} />

    <Screen name="Login" component={Login} />
    <Screen name="Menu" component={Menu} />
    <Screen name="AdminLogin" component={AdminLogin} />
    <Screen name="AdminNewBusinessHome" component={AdminNewBusinessHome} />
    <Screen name="AdminNewBusinessView" component={AdminNewBusinessView} />
    <Screen name="AdminAllBusinessHome" component={AdminAllBusinessHome} />
    <Screen name="AdminAllBusinessView" component={AdminAllBusinessView} />
    <Screen name="AdminSupportHome" component={AdminSupportHome} />
    <Screen name="AdminSupportView" component={AdminSupportView} />
    
    <Screen name="BusProfProHome" component={BusProfProHome} />
    <Screen name="BusProfProAdd" component={BusProfProAdd} />
    <Screen name="BusProfProEdit" component={BusProfProEdit} />
    <Screen name="BusProfProDelete" component={BusProfProDelete} />
    <Screen name="BusProfEvtDelete" component={BusProfEvtDelete} />
    <Screen name="BusProProAddEditBack" component={BusProProAddEditBack} />
    <Screen name="BusProfEvtAdd" component={BusProfEvtAdd} />
    <Screen name="BusProfEvtEdit" component={BusProfEvtEdit} />
    <Screen name="BusProfEvtAddEditBack" component={BusProfEvtAddEditBack} />
    <Screen name="BusProfEdit" component={BusProfEdit} />
    <Screen name="BusProfSectorsEdit" component={BusProfSectorsEdit} />
    <Screen name="BusProfSectorsAdd" component={BusProfSectorsAdd} />
    <Screen name="ReviewList" component={ReviewList} />
    <Screen name="ReviewView" component={ReviewView} />
    <Screen name="ContactForm" component={ContactForm} />
    <Screen name="ContactConfirm" component={ContactConfirm} />
    <Screen name="BusinessDashboard" component={BusinessDashboard} />
    <Screen name="BusDashNoti" component={BusDashNoti} />
    <Screen name="BusDashNotiView" component={BusDashNotiView} />
    <Screen name="BusDashAccHome" component={BusDashAccHome} />
    <Screen name="BusDashAccEdit" component={BusDashAccEdit} />
    <Screen name="BusDashAccPricing" component={BusDashAccPricing} />
    <Screen name="BusDashAccSecurity" component={BusDashAccSecurity} />
    <Screen name="BusDashAccClose" component={BusDashAccClose} />
    <Screen name="LoginUser" component={LoginUser} />
    <Screen name="SignupUserStepOne" component={SignupUserStepOne} />
    <Screen name="SignupUserStepTwo" component={SignupUserStepTwo} />
    <Screen name="SignupUserChoose" component={SignupUserChoose} />
    <Screen name="SignupUserFreeOne" component={SignupUserFreeOne} />
    <Screen name="SignupUserFreeTwo" component={SignupUserFreeTwo} />
    <Screen name="SignupUserMonthlyOne" component={SignupUserMonthlyOne} />
    <Screen name="SignupUserMonthlyTwo" component={SignupUserMonthlyTwo} />
    <Screen name="SignupUserMonthlyThree" component={SignupUserMonthlyThree} />
    <Screen name="ShopperHome" component={ShopperHome} />
    <Screen name="ShopperAccHome" component={ShopperAccHome} />
    <Screen name="ShopperAccEdit" component={ShopperAccEdit} />
    <Screen name="ShopperAccIntHome" component={ShopperAccIntHome} />
    <Screen name="ShopperAccIntAdd" component={ShopperAccIntAdd} />
    <Screen name="ShopperAccSecurity" component={ShopperAccSecurity} />
    <Screen name="ShopperAccClose" component={ShopperAccClose} />
    <Screen name="ShopperAccPlanMem" component={ShopperAccPlanMem} />
    <Screen name="ShopperAccPlanMemCancel" component={ShopperAccPlanMemCancel} />
    <Screen name="ShopperAccPlanMemUpCardDet" component={ShopperAccPlanMemUpCardDet} />
    <Screen name="ShopperAccPlanMemUpdCardDetDone" component={ShopperAccPlanMemUpdCardDetDone} />
    <Screen name="ShopperAccPlanFree" component={ShopperAccPlanFree} />
    <Screen name="ShopperAccPlanFreeUpgrade" component={ShopperAccPlanFreeUpgrade} />
    <Screen name="ShopperAccPlanFreeCardDet" component={ShopperAccPlanFreeCardDet} />
    <Screen name="ShopperAccPlanFreeCardDetDone" component={ShopperAccPlanFreeCardDetDone} />
    <Screen name="ShopperNotiList" component={ShopperNotiList} />
    <Screen name="ShopperNotiView" component={ShopperNotiView} />
    <Screen name="ShopperVerified" component={ShopperVerified} />
    <Screen name="ShopperContactAdmin" component={ShopperContactAdmin} />
    <Screen name="ShopperContactConfirm" component={ShopperContactConfirm} />
    <Screen name="ShopperReviewList" component={ShopperReviewList} />
    <Screen name="ShopperReviewView" component={ShopperReviewView} />
    <Screen name="CatTravel" component={CatTravel} />
    <Screen name="CatProperty" component={CatProperty} />
    <Screen name="CatCommunity" component={CatCommunity} />
    <Screen name="CatEducation" component={CatEducation} />
    <Screen name="CatHealth" component={CatHealth} />
    <Screen name="CatShopping" component={CatShopping} />
    <Screen name="CatEntertainment" component={CatEntertainment} />
    <Screen name="CatServices" component={CatServices} />
    <Screen name="Search" component={Search} />
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator />
  </NavigationContainer>
);
