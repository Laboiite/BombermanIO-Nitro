import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { GameService } from "src/app/services/game/game.service";
import { FormBuilder } from "@angular/forms";
import { HomeComponent } from "./home.component";
describe("HomeComponent", () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  beforeEach(() => {
    const gameServiceStub = {
      enterGame: () => ({}),
      endGame: () => ({}),
      sendTest: (arg1, arg2) => ({})
    };
    const formBuilderStub = { group: object1 => ({}) };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HomeComponent],
      providers: [
        { provide: GameService, useValue: gameServiceStub },
        { provide: FormBuilder, useValue: formBuilderStub }
      ]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });
  it("can load instance", () => {
    expect(component).toBeTruthy();
  });
  describe("testWS", () => {
    it("makes expected calls", () => {
      const gameServiceStub: GameService = fixture.debugElement.injector.get(
        GameService
      );
      spyOn(gameServiceStub, "enterGame").and.callThrough();
      component.testWS();
      expect(gameServiceStub.enterGame).toHaveBeenCalled();
    });
  });
  describe("closeWS", () => {
    it("makes expected calls", () => {
      const gameServiceStub: GameService = fixture.debugElement.injector.get(
        GameService
      );
      spyOn(gameServiceStub, "endGame").and.callThrough();
      component.closeWS();
      expect(gameServiceStub.endGame).toHaveBeenCalled();
    });
  });
  describe("sendTest", () => {
    it("makes expected calls", () => {
      const gameServiceStub: GameService = fixture.debugElement.injector.get(
        GameService
      );
      spyOn(gameServiceStub, "sendTest").and.callThrough();
      component.sendTest();
      expect(gameServiceStub.sendTest).toHaveBeenCalled();
    });
  });
});
