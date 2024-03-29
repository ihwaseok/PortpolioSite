<template>
<li v-for="(item) in props.menuList" v-bind:key="item.MENU_ID">
    <a href="#" class="menu-item" v-on:click="getSubMenuList"  v-on:dblclick="openChildList" v-bind="{menuId: item.MENU_ID, menuName: item.MENU_NM}">
		
		<ArrowIcon class="menu-arrow" v-if="item.CHILD_MENU != undefined" v-on:click="openChildList"/>
		{{ item.MENU_NM }} ({{ calculateNote(item, 0) }})
	</a>

	<ul class="menu-item-sub list-unstyled" v-if="item.CHILD_MENU != undefined">
		<JoplinRecursiveList v-bind:menuList="item.CHILD_MENU" v-bind:onGetMenuId="getMenuId"/>
	</ul>
</li>
</template>


<script setup lang="ts">
import type { MenuData } from '../custom/customType';
import ArrowIcon from '../assets/icon/angle-right-solid.vue';


const props = defineProps<{
    menuList: MenuData[];
}>()

const emit = defineEmits<{
	(e: 'getMenuId', menuData: Partial<MenuData>): void
}>()

// 서브 메뉴 리스트 출력
// 메뉴를 선택했을 경우 메뉴 Id를 JoplinMenu 에게 전달 (Emit)
function getSubMenuList (evt: Event): void {
	const el: Partial<HTMLElement> = evt!.target!;
	const menuId: string = el.getAttribute!('menuId')!;
	const menuName: string = el.getAttribute!('menuName')!;
	const menuData: Partial<MenuData> = {MENU_ID: menuId, MENU_NM: menuName};

	emit('getMenuId', menuData);

	evt.preventDefault(); // 상단이동 방지
}

// 하위 트리 활성화
// 화살표를 선택했을 경우 하위 리스트를 출력하고 화살표 애니메이션을 작동하기 위해 class를 조작
function openChildList (evt: Event): void {
    let el: Partial<HTMLElement> = evt!.target!;
	
	if (el.getAttribute!('menuId') == null) {
		el = el.parentElement!;
	}

    if (el.nextElementSibling != null) {
        const ul: Element = el.nextElementSibling;

        if (ul.classList.contains('menu-activated')) {
            ul.classList.remove('menu-activated');
			el.firstElementChild!.classList.remove('rotated');
        }
        else {
            ul.classList.add('menu-activated');
			el.firstElementChild!.classList.add('rotated');
        }
    }

	evt.preventDefault();
}

// 재귀 호출시 메뉴 Id 가져오기 (Emit-Receive)
function getMenuId(menuData: Partial<MenuData>): void {
	emit('getMenuId', menuData);
}

// 하위 트리를 포함한 노트의 개수 계산
function calculateNote (item: MenuData, count: number): number {
	count = count + item.SUB_CNT;

	if (item.CHILD_MENU != undefined) {
		for (let child of item.CHILD_MENU) {
			count = calculateNote(child, count);
		}
	}

	return count;
}

</script>


<style scoped>
.menu-item {
	display: block;
	color:black;
	padding: 0 0.625rem 0 0.4rem;
	margin: 0;
	margin-bottom: 0.2rem;
	font-weight: 500;
	text-decoration: none;
	line-height: 1.875rem;
}
.menu-item:hover {
	color:blue;
}

.menu-item-sub {
	display: none;
	margin-left: 1rem;
}
.menu-activated {
    display: block;
}
.menu-arrow {
	font-family: "Font Awesome 5 Free", sans-serif;
	font-size: 0.8rem;
	font-weight: 900;
	margin-top: 0.6rem;
	margin-right: 0.3rem;
	float: right;
}
.rotated {
	transform: rotate(90deg);
}
.text-white {
	color: whitesmoke;
}
</style>