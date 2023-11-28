import React from 'react'
import { createHashRouter, Navigate } from 'react-router-dom'
import Home from '@/pages/Home'
import Login from '@/pages/Login'



// 全局路由
export const globalRouters = createHashRouter([
    // 对精确匹配"/login"，跳转Login页面
    {
        path: '/login',
        element: <Login></Login>,
    },
    // 精确匹配"/home"，跳转Home页面
    {
        path: '/home',
        element: <Home />,
    },
    // 如果URL没有"#路由"，跳转Login页面
    {
        path: '/',
        element: <Home />,
    },
    // 未匹配，，跳转Login页面
    {
        path: '*',
        element: <Navigate to="/login" />,
    },
])