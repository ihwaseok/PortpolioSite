<template>
	<!-- 좌측 메뉴 -->
	<v-navigation-drawer color="#313640" class="border-e-md">
		<JoplinRecursiveList v-if="mainMenuList.length > 0" v-bind:menuList="mainMenuList" v-bind:onGetMenuId="getMenuId"/>
	</v-navigation-drawer>

	<!-- 좌측 상세메뉴 -->
	<v-navigation-drawer color="#F4F5F6">
    	<v-list>
    		<JoplinSubList v-bind:menuName="menuName" v-bind:menuList="subMenuList" v-bind:onGetMenuPath="getMenuPath"/>
    	</v-list>
    </v-navigation-drawer>
</template>

<script lang="ts">
import Axios, { type AxiosResponse, AxiosError } from 'axios';
import type { MenuData } from '../custom/customType';
import JoplinRecursiveList from './JoplinRecursiveList.vue';
import JoplinSubList from './JoplinSubList.vue';


export default {
	components: {
		JoplinRecursiveList,
		JoplinSubList
	},
	data() {
		return {
			mainMenuList: [] as MenuData[],
			menuName: '' as string,
			subMenuList: [] as MenuData[]
		};
	},
	mounted() {
		this.getMenuList();
	},
	methods: {
		// DB로 부터 메뉴 리스트 가져오기
		getMenuList (): void {
			Axios.get('/joplin/menu/r', {params: {id: 'all'}})
				.then((res: AxiosResponse) => {
					this.mainMenuList = this.convertMainMenuData(res.data);
				})
				.catch((error: AxiosError) => {
					alert('에러 발생');
				});
		},

		// 메뉴 리스트를 JoplinRecursiveList 컴포넌트 에서 구성하기 위한 형식으로 변환
		// 최하단에서 부터 위로 올라오며 처리 (DB에서 받아오는 데이터는 정렬되어 있다)
		convertMainMenuData (menuList: MenuData[]): MenuData[] {
			let mainMenuList: MenuData[] = [];
			
			for (let i: number = menuList.length-1; i >= 0; i--) {
				if (menuList[i].CHILD_MENU_ID != null && menuList[i].CHILD_MENU_ID != undefined) {
					let childMenuId: string[] = menuList[i].CHILD_MENU_ID.split(',');
					let childMenuList: MenuData[] = [];

					for (let j: number = menuList.length-1; j >= i; j--) {	
						if (childMenuId.includes(menuList[j].MENU_ID)) {
							childMenuList.push(menuList[j]);
						}
					}

					childMenuList.sort(this.menuSortStandard);
					menuList[i].CHILD_MENU = childMenuList;
				}
				
				if (menuList[i].PARENT_ID == '' || menuList[i].PARENT_ID == undefined) {
					mainMenuList.push(menuList[i]);
				}
			}

			mainMenuList.sort(this.menuSortStandard);
			return mainMenuList;
		},

		// 메뉴 리스트 정렬기준
		menuSortStandard (a: MenuData, b: MenuData) {
			if (a == null || b == null)
				return -1;
			if (a.SORT_NO > b.SORT_NO)
				return -1;
				
			return -1;
		},

		// JoplinRecursiveList 에서 클릭한 메뉴의 Id를 받아오기 (Emit-Receive)
		getMenuId (menuData: Partial<MenuData>): void {
			const menuId: string = menuData.MENU_ID!;
			const menuName: string = menuData.MENU_NM!;

			if (menuId != '' && menuId != null && menuId != undefined) {
				this.getSubMenuList(menuId);
				this.menuName = menuName;
			}
		},

		// 받아온 메뉴 Id로 서브 메뉴 리스트 가져오기
		getSubMenuList (menuId: string): void {
			if (menuId != null && menuId != undefined) {
				Axios.get('/joplin/menu/r', {params: {id: menuId}})
					.then((res: AxiosResponse) => {
						this.subMenuList = res.data;
					});
			}
		},

		// JoplinSubList 에서 클릭한 메뉴의 Path를 받아와서 App 으로 전달 (Emit, Emit-Receive)
		getMenuPath (menuPath: string): void {
			this.$emit('getMenuPath', menuPath);
		}
	}
}
</script>

<style>
body {
	-ms-overflow-style: none;
}
::-webkit-scrollbar {
	display: none;
}
</style>