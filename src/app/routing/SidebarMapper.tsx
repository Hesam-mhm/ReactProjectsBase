import React from 'react';
import { RouteMapper } from './RouteMapper/RouteMapper';
import { SolarHomeAngle2Outline } from '../Iconify/SolarHomeAngle2Outline';
import { SolarHome2Bold } from '../Iconify/SolarHome2Bold';
import { Roles } from '../constants/Roles';

export type SidebarItem = {
  title: string;
  to: string;
  outLinedIcon?: React.ReactElement;
  boldIcon?: React.ReactElement;
  hasBullet?: boolean;
  roles?: string[];
};

export type SidebarGroup = {
  title: string;
  to: string;
  icon: React.ReactElement;
  roles?: string[];
  children: SidebarItem[];
  activeRoutes?: string[];
};

export type SidebarEntry = SidebarItem | SidebarGroup;

export const SidebarMapper: SidebarEntry[] = [
  {
    title: 'خانه',
    to: RouteMapper.Home.path,
    outLinedIcon: <SolarHomeAngle2Outline />,
    boldIcon: <SolarHome2Bold />,
    roles: [Roles.SystemManager],
  },

  // {
  //   title: 'بررسی امور اداری واحد اداری',
  //   icon: <SolarChecklistMinimalisticOutline />,
  //   to: '/Automation',
  //   roles: [RoleConstant.AdministrativeUnit],
  //   activeRoutes: [
  //     RouteMapper.AutomationMapper.DailyLeave.AdministrativeUnitDailyLeaveList.path,
  //     RouteMapper.AutomationMapper.HourlyLeave.AdministrativeUnitHourlyLeaveList.path,
  //     RouteMapper.AutomationMapper.DailyMission.AdministrativeUnitDailyMissionList.path,
  //     RouteMapper.AutomationMapper.HourlyMission.AdministrativeUnitHourlyMissionList.path,
  //   ],
  //   children: [
  //     {
  //       title: 'بررسی مرخصی‌های روزانه',
  //       to: RouteMapper.AutomationMapper.DailyLeave.AdministrativeUnitDailyLeaveList.path,
  //       hasBullet: true,
  //     },
  //     {
  //       title: 'بررسی مرخصی‌های ساعتی',
  //       to: RouteMapper.AutomationMapper.HourlyLeave.AdministrativeUnitHourlyLeaveList.path,
  //       hasBullet: true,
  //     },
  //     {
  //       title: 'بررسی مأموریت‌های روزانه',
  //       to: RouteMapper.AutomationMapper.DailyMission.AdministrativeUnitDailyMissionList.path,
  //       hasBullet: true,
  //     },
  //     {
  //       title: 'بررسی مأموریت‌های ساعتی',
  //       to: RouteMapper.AutomationMapper.HourlyMission.AdministrativeUnitHourlyMissionList.path,
  //       hasBullet: true,
  //     },
  //   ],
  // },
  // {
  //   title: 'بررسی امور اداری مدیر واحد',
  //   icon: <SolarChecklistMinimalisticOutline />,
  //   to: '/Automation',
  //   roles: [RoleConstant.UnitManager],
  //   activeRoutes: [
  //     RouteMapper.AutomationMapper.DailyLeave.UnitManagerDailyLeaveList.path,
  //     RouteMapper.AutomationMapper.HourlyLeave.UnitManagerHourlyLeaveList.path,
  //     RouteMapper.AutomationMapper.DailyMission.UnitManagerDailyMissionList.path,
  //     RouteMapper.AutomationMapper.HourlyMission.UnitManagerHourlyMissionList.path,
  //   ],
  //   children: [
  //     {
  //       title: 'بررسی مرخصی‌های روزانه',
  //       to: RouteMapper.AutomationMapper.DailyLeave.UnitManagerDailyLeaveList.path,
  //       hasBullet: true,
  //     },
  //     {
  //       title: 'بررسی مرخصی‌های ساعتی',
  //       to: RouteMapper.AutomationMapper.HourlyLeave.UnitManagerHourlyLeaveList.path,
  //       hasBullet: true,
  //     },
  //     {
  //       title: 'بررسی مأموریت‌های روزانه',
  //       to: RouteMapper.AutomationMapper.DailyMission.UnitManagerDailyMissionList.path,
  //       hasBullet: true,
  //     },
  //     {
  //       title: 'بررسی مأموریت‌های ساعتی',
  //       to: RouteMapper.AutomationMapper.HourlyMission.UnitManagerHourlyMissionList.path,
  //       hasBullet: true,
  //     },
  //   ],
  // },
];
