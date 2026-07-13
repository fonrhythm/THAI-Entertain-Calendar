/**
 * Chob Calendar 全局 Firebase 配置 + 导航栏管理
 * 在所有页面的 <head> 中引入: <script type="module" src="/firebase-global.js"></script>
 */

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
// 修改这一行，加上 collection, doc, setDoc, serverTimestamp
import { getFirestore, doc, getDoc, collection, setDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyAv4v5B1HXotOABmIcc5TOi3uzqPmLnvNs",
  authDomain: "chob-calendar.firebaseapp.com",
  projectId: "chob-calendar",
  storageBucket: "chob-calendar.firebasestorage.app",
  messagingSenderId: "629896393980",
  appId: "1:629896393980:web:d8800df187ba495b895379"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ════════════════════════════════════════════════════════════════════
// 注入侧边栏菜单 HTML
// ════════════════════════════════════════════════════════════════════
function injectSidebar() {
  const sidebarHTML = `
    <div id="user-sidebar-overlay" onclick="closeSidebar()" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.3);z-index:999;"></div>
    <div id="user-sidebar" style="display:none;position:fixed;top:0;right:0;width:100%;max-width:280px;height:100vh;background:#fff;z-index:1000;box-shadow:-2px 0 12px rgba(0,0,0,.15);flex-direction:column;padding-top:60px;">
      <nav style="flex:1;padding:20px 0;">
        <a href="/account/" onclick="closeSidebar()" style="display:block;padding:16px 24px;color:#1a1a1a;text-decoration:none;border-bottom:1px solid #f0ece6;transition:background .15s;">
          <i class="ti ti-user" style="margin-right:8px;"></i> 个人主页
        </a>
        <!-- 收藏菜单项被隐藏 -->
        <button onclick="handleLogout()" style="width:100%;padding:16px 24px;border:none;background:none;text-align:left;color:#1a1a1a;cursor:pointer;border-top:1px solid #f0ece6;font-family:inherit;font-size:14px;transition:background .15s;">
          <i class="ti ti-logout" style="margin-right:8px;"></i> 登出
        </button>
      </nav>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', sidebarHTML);
}

window.closeSidebar = function() {
  document.getElementById('user-sidebar').style.display = 'none';
  document.getElementById('user-sidebar-overlay').style.display = 'none';
};

window.openSidebar = function() {
  document.getElementById('user-sidebar').style.display = 'flex';
  document.getElementById('user-sidebar-overlay').style.display = 'block';
};

// ════════════════════════════════════════════════════════════════════
// 监听用户状态变化
// ════════════════════════════════════════════════════════════════════
onAuthStateChanged(auth, async (user) => {
  updateNavigation(user);
});

async function updateNavigation(user) {
  const loginArea = document.querySelector('[data-login-status]');
  if (!loginArea) return;

  if (user) {
    // 用户已登录 → 显示头像 icon
    try {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data() || {};
      
      const avatarColor = userData.avatarColor || '#5F1E24';
      const displayName = user.displayName || user.email.split('@')[0];
      const firstChar = displayName.charAt(0).toUpperCase();
      
      loginArea.innerHTML = `
        <button onclick="openSidebar()" style="
          background:${avatarColor};
          color:#fff;
          width:40px;
          height:40px;
          border-radius:50%;
          border:none;
          cursor:pointer;
          font-size:16px;
          font-weight:700;
          display:flex;
          align-items:center;
          justify-content:center;
          transition:opacity .15s;
          font-family:'Noto Sans SC',sans-serif;
        " 
        onmouseover="this.style.opacity='0.8'" 
        onmouseout="this.style.opacity='1'">
          ${firstChar}
        </button>
      `;
    } catch (e) {
      console.error('加载用户数据失败:', e);
      loginArea.innerHTML = '<a href="/login/" style="color: #1a1a1a; text-decoration: none; font-weight: 500;">登录</a>';
    }
  } else {
    // 用户未登录 → 显示登录链接
    loginArea.innerHTML = '<a href="/login/" style="color: #1a1a1a; text-decoration: none; font-weight: 500;">登录</a>';
  }
}

// ════════════════════════════════════════════════════════════════════
// 登出函数
// ════════════════════════════════════════════════════════════════════
window.handleLogout = async function() {
  if (!confirm('确定要登出吗？')) return;
  
  try {
    closeSidebar();
    await signOut(auth);
    window.location.href = '/';
  } catch (error) {
    console.error('登出失败:', error);
    alert('登出失败，请重试');
  }
};

// 将 auth 挂载到 window，方便其他脚本使用
window.chobAuth = auth;

// 页面加载完成后注入侧边栏
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectSidebar);
} else {
  injectSidebar();
}

// ============ 数据追踪模块 ============
const ANALYTICS_CONFIG = { enabled: true };
let eventQueue = [];

// 追踪事件函数
window.trackEvent = async function(eventType, artistName, metadata = {}) {
  if (!ANALYTICS_CONFIG.enabled) return;
  
  const today = new Date().toISOString().split('T')[0];
  const eventData = {
    eventType,
    artistName,
    metadata,
    timestamp: serverTimestamp(),
    userAgent: navigator.userAgent.substring(0, 100)
  };

  try {
    // 存入 analytics_events 集合，按日期归档
    const eventRef = collection(db, 'analytics_events', today, 'events');
    await addDoc(eventRef, eventData);
    console.log(`✅ Analytics tracked: ${eventType} for ${artistName}`);
  } catch (error) {
    console.error('❌ Analytics error:', error);
  }
};
