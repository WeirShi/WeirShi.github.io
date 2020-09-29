import {
  VuexModule,
  Module,
  Mutation,
  getModule
} from "vuex-module-decorators";
import store from "./index";

@Module({ dynamic: true, name: "blog", namespaced: true, store })
class Blog extends VuexModule {
  public screen: Dictionary<number> = {
    width: 0,
    height: 0
  };

  public showMobileTabs = false;

  @Mutation
  setScreen(screenWidth: number, screenHeight: number) {
    this.screen = {
      width: screenWidth,
      height: screenHeight
    };
  }

  @Mutation
  changeMobileTabs(showMobileTabs: boolean) {
    this.showMobileTabs = showMobileTabs;
  }
}

export const blogStoreModule = getModule(Blog);
