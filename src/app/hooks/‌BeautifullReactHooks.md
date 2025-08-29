https://www.npmjs.com/package/beautiful-react-hooks

useMutableState

مدیریت حالت با قابلیت تغییر مستقیم (مشابه useState اما با امکان تغییر مستقیم شیء حالت).

مثال:

import { useMutableState } from 'beautiful-react-hooks';

function Counter() {
const [state, setState] = useMutableState({ count: 0 });
const increment = () => {
state.count++;
setState(state);
};

return <button onClick={increment}>Count: {state.count}</button>;
}

useInfiniteScroll

پیاده‌سازی اسکرول بی‌نهایت برای بارگذاری داده‌ها هنگام اسکرول.

وابستگی: نیاز به react-intersection-observer.

مثال:

import { useInfiniteScroll } from 'beautiful-react-hooks';
import { useInView } from 'react-intersection-observer';

function InfiniteList() {
const { ref, inView } = useInView();
const { isFetching, loadMore } = useInfiniteScroll(inView);

return (
<div>
<ul>{/_ لیست آیتم‌ها _/}</ul>
<div ref={ref}>{isFetching ? 'Loading...' : 'Load More'}</div>
</div>
);
}

useObservable

مدیریت Observable‌ها (از RxJS) در React.

وابستگی: نیاز به rxjs.

مثال:

import { useObservable } from 'beautiful-react-hooks';
import { interval } from 'rxjs';

function Timer() {
const value = useObservable(interval(1000), 0);
return <p>Seconds: {value}</p>;
}

useEvent

اتصال و مدیریت رویدادهای DOM به یک المنت خاص.

مثال:

import { useEvent, useRef } from 'beautiful-react-hooks';

function ClickableDiv() {
const ref = useRef();
useEvent(ref, 'click', () => alert('Div clicked!'));

return <div ref={ref}>Click me!</div>;
}

useGlobalEvent

گوش دادن به رویدادهای سراسری در سطح window.

مثال:

import { useGlobalEvent } from 'beautiful-react-hooks';

function KeyListener() {
useGlobalEvent('keydown', (e) => console.log(`Key pressed: ${e.key}`));
return <p>Press any key!</p>;
}

usePreviousValue

ذخیره مقدار قبلی یک متغیر یا حالت.

مثال:

import { usePreviousValue, useState } from 'beautiful-react-hooks';

function Counter() {
const [count, setCount] = useState(0);
const prevCount = usePreviousValue(count);
return (
<div>
<p>Current: {count}, Previous: {prevCount}</p>
<button onClick={() => setCount(count + 1)}>Increment</button>
</div>
);
}

useValueHistory

نگهداری تاریخچه مقادیر یک متغیر.

مثال:

import { useValueHistory, useState } from 'beautiful-react-hooks';

function HistoryTracker() {
const [value, setValue] = useState('');
const history = useValueHistory(value);
return (
<div>
<input value={value} onChange={(e) => setValue(e.target.value)} />
<p>History: {history.join(', ')}</p>
</div>
);
}

useValidatedState

مدیریت حالت با اعتبارسنجی خودکار.

مثال:

import { useValidatedState } from 'beautiful-react-hooks';

function EmailInput() {
const [email, setEmail, isValid] = useValidatedState('', (val) => /\S+@\S+\.\S+/.test(val));
return (
<div>
<input value={email} onChange={(e) => setEmail(e.target.value)} />
<p>{isValid ? 'Valid email' : 'Invalid email'}</p>
</div>
);
}

useMediaQuery

بررسی مطابقت با Media Queryها.

مثال:

import { useMediaQuery } from 'beautiful-react-hooks';

function ResponsiveComponent() {
const isMobile = useMediaQuery('(max-width: 768px)');
return <p>{isMobile ? 'Mobile view' : 'Desktop view'}</p>;
}

useOnlineState

تشخیص وضعیت آنلاین/آفلاین مرورگر.

مثال:

import { useOnlineState } from 'beautiful-react-hooks';

function NetworkStatus() {
const isOnline = useOnlineState();
return <p>{isOnline ? 'Online' : 'Offline'}</p>;
}

useViewportSpy

تشخیص ورود/خروج المنت به viewport.

وابستگی: نیاز به react-intersection-observer.

مثال:

import { useViewportSpy } from 'beautiful-react-hooks';
import { useRef } from 'react';

function VisibleElement() {
const ref = useRef();
const isVisible = useViewportSpy(ref);
return <div ref={ref}>{isVisible ? 'In view!' : 'Out of view'}</div>;
}

useViewportState

مدیریت حالت المنت‌های داخل viewport.

مثال:

import { useViewportState } from 'beautiful-react-hooks';
import { useRef } from 'react';

function ElementState() {
const ref = useRef();
const { isInViewport, ratio } = useViewportState(ref);
return <div ref={ref}>Visibility: {ratio \* 100}%</div>;
}

useSpeechRecognition

تشخیص گفتار در مرورگر.

مثال:

import { useSpeechRecognition } from 'beautiful-react-hooks';

function VoiceInput() {
const { isListening, transcript, start, stop } = useSpeechRecognition();
return (
<div>
<button onClick={start}>Start</button>
<button onClick={stop}>Stop</button>
<p>Transcript: {transcript}</p>
</div>
);
}

useSpeechSynthesis

تولید گفتار در مرورگر.

مثال:

import { useSpeechSynthesis } from 'beautiful-react-hooks';

function TextToSpeech() {
const { speak } = useSpeechSynthesis();
return <button onClick={() => speak('Hello, world!')}>Speak</button>;
}

useGeolocation

دسترسی به موقعیت جغرافیایی کاربر.

مثال:

import { useGeolocation } from 'beautiful-react-hooks';

function Location() {
const { coords, error } = useGeolocation();
return (
<p>
{coords ? `Lat: ${coords.latitude}, Lon: ${coords.longitude}` : error || 'Loading...'}
</p>
);
}

useGeolocationState

مدیریت حالت موقعیت جغرافیایی.

مثال:

import { useGeolocationState } from 'beautiful-react-hooks';

function LocationState() {
const [state, setOptions] = useGeolocationState();
return <p>Latitude: {state.coords?.latitude || 'N/A'}</p>;
}

useGeolocationEvents

مدیریت رویدادهای موقعیت جغرافیایی.

مثال:

import { useGeolocationEvents } from 'beautiful-react-hooks';

function LocationEvents() {
useGeolocationEvents((position) => console.log('New position:', position.coords));
return <p>Tracking location...</p>;
}

useDrag

مدیریت قابلیت کشیدن (Drag).

مثال:

import { useDrag } from 'beautiful-react-hooks';
import { useRef } from 'react';

function Draggable() {
const ref = useRef();
const { isDragging } = useDrag(ref);
return <div ref={ref}>{isDragging ? 'Dragging' : 'Not dragging'}</div>;
}

useDropZone

مدیریت منطقه رها کردن (Drop Zone).

مثال:

import { useDropZone } from 'beautiful-react-hooks';
import { useRef } from 'react';

function DropArea() {
const ref = useRef();
const { isOver } = useDropZone(ref);
return <div ref={ref} style={{ background: isOver ? 'yellow' : 'white' }}>Drop here</div>;
}

useDragEvents

مدیریت رویدادهای Drag.

مثال:

import { useDragEvents } from 'beautiful-react-hooks';
import { useRef } from 'react';

function DragHandler() {
const ref = useRef();
useDragEvents(ref, { onDragStart: () => console.log('Drag started') });
return <div ref={ref}>Drag me</div>;
}

useMouse

ردیابی موقعیت ماوس.

مثال:

import { useMouse } from 'beautiful-react-hooks';

function MouseTracker() {
const { x, y } = useMouse();
return <p>Mouse position: ({x}, {y})</p>;
}

useMouseState

مدیریت حالت ماوس.

مثال:

import { useMouseState } from 'beautiful-react-hooks';

function MouseState() {
const state = useMouseState();
return <p>Mouse down: {state.isDown ? 'Yes' : 'No'}</p>;
}

useMouseEvents

مدیریت رویدادهای ماوس.

مثال:

import { useMouseEvents } from 'beautiful-react-hooks';
import { useRef } from 'react';

function MouseHandler() {
const ref = useRef();
useMouseEvents(ref, { onClick: () => console.log('Clicked!') });
return <div ref={ref}>Click me</div>;
}

useTouch

ردیابی رویدادهای لمسی.

مثال:

import { useTouch } from 'beautiful-react-hooks';

function TouchTracker() {
const { x, y } = useTouch();
return <p>Touch position: ({x}, {y})</p>;
}

useTouchState

مدیریت حالت لمسی.

مثال:

import { useTouchState } from 'beautiful-react-hooks';

function TouchState() {
const state = useTouchState();
return <p>Touching: {state.isTouching ? 'Yes' : 'No'}</p>;
}

useTouchEvents

مدیریت رویدادهای لمسی.

مثال:

import { useTouchEvents } from 'beautiful-react-hooks';
import { useRef } from 'react';

function TouchHandler() {
const ref = useRef();
useTouchEvents(ref, { onTouchStart: () => console.log('Touch started') });
return <div ref={ref}>Touch me</div>;
}

useLifecycle

مدیریت چرخه حیات کامپوننت.

مثال:

import { useLifecycle } from 'beautiful-react-hooks';

function LifecycleComponent() {
useLifecycle(
() => console.log('Mounted'),
() => console.log('Unmounted')
);
return <p>Check console for lifecycle events</p>;
}

useDidMount

اجرای کد هنگام Mount شدن کامپوننت.

مثال:

import { useDidMount } from 'beautiful-react-hooks';

function MountComponent() {
useDidMount(() => console.log('Component mounted'));
return <p>Check console</p>;
}

useWillUnmount

اجرای کد هنگام Unmount شدن کامپوننت.

مثال:

import { useWillUnmount } from 'beautiful-react-hooks';

function UnmountComponent() {
useWillUnmount(() => console.log('Component will unmount'));
return <p>Check console</p>;
}

useWindowResize

ردیابی تغییرات اندازه پنجره.

مثال:

import { useWindowResize } from 'beautiful-react-hooks';

function ResizeTracker() {
const { width, height } = useWindowResize();
return <p>Window size: {width}x{height}</p>;
}

useWindowScroll

ردیابی موقعیت اسکرول پنجره.

مثال:

import { useWindowScroll } from 'beautiful-react-hooks';

function ScrollTracker() {
const { scrollX, scrollY } = useWindowScroll();
return <p>Scroll position: ({scrollX}, {scrollY})</p>;
}

useRequestAnimationFrame

اجرای انیمیشن‌ها با requestAnimationFrame.

مثال:

import { useRequestAnimationFrame } from 'beautiful-react-hooks';

function Animation() {
useRequestAnimationFrame((time) => console.log('Frame time:', time));
return <p>Check console for animation frames</p>;
}

useResizeObserver

نظارت بر تغییرات اندازه المنت.

مثال:

import { useResizeObserver } from 'beautiful-react-hooks';
import { useRef } from 'react';

function ResizeElement() {
const ref = useRef();
const { width, height } = useResizeObserver(ref);
return <div ref={ref}>Size: {width}x{height}</div>;
}

useTimeout

مدیریت تایمرهای تاخیری.

مثال:

import { useTimeout } from 'beautiful-react-hooks';

function DelayedAction() {
const { start, clear } = useTimeout(() => alert('Timed out!'), 2000);
return <button onClick={start}>Start Timeout</button>;
}

useInterval

مدیریت تایمرهای دوره‌ای.

مثال:

import { useInterval } from 'beautiful-react-hooks';

function Ticker() {
const { start, stop } = useInterval(() => console.log('Tick'), 1000);
return (
<div>
<button onClick={start}>Start</button>
<button onClick={stop}>Stop</button>
</div>
);
}

useDebouncedCallback

ایجاد کال‌بک‌های Debounced.

مثال:

import { useDebouncedCallback } from 'beautiful-react-hooks';

function SearchInput() {
const debouncedSearch = useDebouncedCallback((value) => console.log('Search:', value), 500);
return <input onChange={(e) => debouncedSearch(e.target.value)} />;
}

useThrottledCallback

ایجاد کال‌بک‌های Throttled.

مثال:

import { useThrottledCallback } from 'beautiful-react-hooks';

function ScrollHandler() {
const throttledScroll = useThrottledCallback(() => console.log('Scrolled'), 200);
return <div onScroll={throttledScroll}>Scroll me</div>;
}

useLocalStorage

مدیریت داده‌ها در localStorage.

مثال:

import { useLocalStorage } from 'beautiful-react-hooks';

function PersistData() {
const [value, setValue] = useLocalStorage('key', 'initial');
return <input value={value} onChange={(e) => setValue(e.target.value)} />;
}

useSessionStorage

مدیریت داده‌ها در sessionStorage.

مثال:

import { useSessionStorage } from 'beautiful-react-hooks';

function SessionData() {
const [value, setValue] = useSessionStorage('key', 'initial');
return <input value={value} onChange={(e) => setValue(e.target.value)} />;
}

useDefaultedState

مدیریت حالت با مقدار پیش‌فرض.

مثال:

import { useDefaultedState } from 'beautiful-react-hooks';

function DefaultState() {
const [value, setValue] = useDefaultedState(undefined, 'default');
return <p>Value: {value}</p>;
}

useRenderInfo

دریافت اطلاعات رندر کامپوننت.

مثال:

import { useRenderInfo } from 'beautiful-react-hooks';

function RenderCounter() {
const { count } = useRenderInfo();
return <p>Render count: {count}</p>;
}

useSwipe

مدیریت ژست‌های Swipe.

مثال:

import { useSwipe } from 'beautiful-react-hooks';
import { useRef } from 'react';

function Swipeable() {
const ref = useRef();
const { direction } = useSwipe(ref);
return <div ref={ref}>Swipe direction: {direction}</div>;
}

useHorizontalSwipe

مدیریت ژست‌های Swipe افقی.

مثال:

import { useHorizontalSwipe } from 'beautiful-react-hooks';
import { useRef } from 'react';

function HorizontalSwipeable() {
const ref = useRef();
const { direction } = useHorizontalSwipe(ref);
return <div ref={ref}>Horizontal swipe: {direction}</div>;
}

useVerticalSwipe

مدیریت ژست‌های Swipe عمودی.

مثال:

import { useVerticalSwipe } from 'beautiful-react-hooks';
import { useRef } from 'react';

function VerticalSwipeable() {
const ref = useRef();
const { direction } = useVerticalSwipe(ref);
return <div ref={ref}>Vertical swipe: {direction}</div>;
}

useSwipeEvents

مدیریت رویدادهای Swipe.

مثال:

import { useSwipeEvents } from 'beautiful-react-hooks';
import { useRef } from 'react';

function SwipeHandler() {
const ref = useRef();
useSwipeEvents(ref, { onSwipeLeft: () => console.log('Swiped left') });
return <div ref={ref}>Swipe me</div>;
}

useConditionalTimeout

مدیریت تایمرهای شرطی.

مثال:

import { useConditionalTimeout } from 'beautiful-react-hooks';

function ConditionalTimer() {
const { start } = useConditionalTimeout(
() => console.log('Timed out'),
2000,
(condition) => condition === true
);
return <button onClick={() => start(true)}>Start</button>;
}

useCookie

مدیریت کوکی‌های مرورگر.

مثال:

import { useCookie } from 'beautiful-react-hooks';

function CookieManager() {
const [cookie, setCookie] = useCookie('myCookie', 'default');
return <button onClick={() => setCookie('newValue')}>Set Cookie</button>;
}

useDarkMode

تشخیص و مدیریت حالت تاریک.

مثال:

import { useDarkMode } from 'beautiful-react-hooks';

function ThemeToggle() {
const { isDarkMode, toggle } = useDarkMode();
return (
<div>
<p>{isDarkMode ? 'Dark' : 'Light'} Mode</p>
<button onClick={toggle}>Toggle Theme</button>
</div>
);
}

useUnmount

اجرای کد هنگام Unmount شدن کامپوننت.

مثال:

import { useUnmount } from 'beautiful-react-hooks';

function CleanupComponent() {
useUnmount(() => console.log('Unmounted'));
return <p>Check console on unmount</p>;
}

useUpdateEffect

اجرای افکت فقط هنگام به‌روزرسانی.

مثال:

import { useUpdateEffect, useState } from 'beautiful-react-hooks';

function UpdateComponent() {
const [count, setCount] = useState(0);
useUpdateEffect(() => console.log('Count updated:', count), [count]);
return <button onClick={() => setCount(count + 1)}>Increment</button>;
}

useIsFirstRender

تشخیص رندر اولیه کامپوننت.

مثال:

import { useIsFirstRender } from 'beautiful-react-hooks';

function FirstRender() {
const isFirstRender = useIsFirstRender();
return <p>{isFirstRender ? 'First render' : 'Not first render'}</p>;
}

useMutationObserver

نظارت بر تغییرات DOM.

مثال:

import { useMutationObserver } from 'beautiful-react-hooks';
import { useRef } from 'react';

function DOMWatcher() {
const ref = useRef();
useMutationObserver(ref, () => console.log('DOM changed'), { childList: true });
return <div ref={ref}>Change my content</div>;
}

useAudio

مدیریت پخش صدا.

مثال:

import { useAudio } from 'beautiful-react-hooks';

function AudioPlayer() {
const { play, pause } = useAudio('path/to/audio.mp3');
return (
<div>
<button onClick={play}>Play</button>
<button onClick={pause}>Pause</button>
</div>
);
}

useObjectState

مدیریت شیء حالت با آپدیت‌های جزئی.

مثال:

import { useObjectState } from 'beautiful-react-hooks';

function ObjectManager() {
const [state, setState] = useObjectState({ name: '', age: 0 });
return (
<input
value={state.name}
onChange={(e) => setState({ name: e.target.value })}
/>
);
}

useToggle

مدیریت حالت بولین (true/false).

مثال:

import { useToggle } from 'beautiful-react-hooks';

function ToggleButton() {
const [isOn, toggle] = useToggle(false);
return <button onClick={toggle}>{isOn ? 'On' : 'Off'}</button>;
}

useQueryParam

مدیریت یک پارامتر URL.

وابستگی: نیاز به react-router-dom.

مثال:

import { useQueryParam } from 'beautiful-react-hooks';

function QueryReader() {
const [param, setParam] = useQueryParam('search');
return <input value={param || ''} onChange={(e) => setParam(e.target.value)} />;
}

useQueryParams

مدیریت تمام پارامترهای URL.

وابستگی: نیاز به react-router-dom.

مثال:

import { useQueryParams } from 'beautiful-react-hooks';

function QueryManager() {
const [params, setParams] = useQueryParams();
return <p>Params: {JSON.stringify(params)}</p>;
}

useSearchQuery

مدیریت جستجو در URL.

وابستگی: نیاز به react-router-dom.

مثال:

import { useSearchQuery } from 'beautiful-react-hooks';

function SearchBar() {
const [query, setQuery] = useSearchQuery();
return <input value={query || ''} onChange={(e) => setQuery(e.target.value)} />;
}

useURLSearchParams

مدیریت URLSearchParams در React.

مثال:

import { useURLSearchParams } from 'beautiful-react-hooks';

function URLParams() {
const [params, setParams] = useURLSearchParams();
return <p>Params: {params.toString()}</p>;
}

نکات

برای هوک‌هایی که وابستگی دارند (مثل useInfiniteScroll یا useQueryParam)، مطمئن شوید بسته‌های مورد نیاز نصب شده‌اند.

مستندات کامل و مثال‌های پیشرفته‌تر در GitHub موجود است.
