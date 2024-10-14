# 렌트카 시스템

## 파일 구조

```
src/
├── app.module.ts # 애플리케이션의 루트 모듈
├── main.ts # 애플리케이션의 진입점
├── config/
│ └── swagger.config.ts # Swagger 설정
├── common/
│ ├── enums/
│ │ └── error-codes.enum.ts # 에러 코드 및 메시지 정의
│ ├── exceptions/
│ │ ├── custom-exception.ts # 커스텀 예외 클래스
│ │ └── http-exception.filter.ts # 전역 예외 필터
│ └── interceptors/
│ └── transform.interceptor.ts # 응답 변환 인터셉터
└── vehicles/
├── controllers/
│ └── vehicles.controller.ts # 차량 관련 API 엔드포인트 정의
├── dto/
│ ├── create-vehicle.dto.ts # 차량 생성 DTO
│ ├── update-vehicle.dto.ts # 차량 수정 DTO
│ ├── vehicle-response.dto.ts # 차량 응답 DTO
│ └── vehicle-detail.dto.ts # 차량 상세 정보 DTO
├── entities/
│ ├── vehicle.entity.ts # 기본 차량 엔티티
│ ├── car.entity.ts # 자동차 엔티티
│ └── motorcycle.entity.ts # 오토바이 엔티티
├── factories/
│ ├── car.factory.ts # 자동차 팩토리
│ └── motorcycle.factory.ts # 오토바이 팩토리
├── interfaces/
│ ├── vehicle.interface.ts # 차량 인터페이스
│ ├── vehicle-factory.interface.ts # 차량 팩토리 인터페이스
│ ├── vehicle-repository.interface.ts # 차량 저장소 인터페이스
│ └── rentable.interface.ts # 렌트 가능 인터페이스
├── repositories/
│ └── vehicle.repository.ts # 차량 저장소 구현
├── services/
│ ├── vehicles.service.ts # 차량 서비스
│ ├── vehicle-factory.service.ts # 차량 팩토리 서비스
│ └── vehicle-calculation.service.ts # 차량 계산 서비스
└── vehicles.module.ts # 차량 모듈
```

## 동작 방식

1. `main.ts`에서 애플리케이션을 부트스트랩하고 전역 파이프, 필터, 인터셉터를 설정합니다.
2. `vehicles.controller.ts`에서 정의된 엔드포인트로 요청이 들어오면, 해당 핸들러 메서드가 실행됩니다.
3. 핸들러 메서드는 `vehicles.service.ts`의 메서드를 호출하여 비즈니스 로직을 수행합니다.
4. `vehicle-factory.service.ts`는 차량 유형에 따라 적절한 팩토리를 사용하여 차량 객체를 생성합니다.
5. `vehicle.repository.ts`는 차량 데이터를 저장하고 조회하는 역할을 합니다.
6. `vehicle-calculation.service.ts`는 차량과 관련된 다양한 계산을 수행합니다.
7. 예외가 발생하면 `http-exception.filter.ts`에서 처리됩니다.
8. 응답은 `transform.interceptor.ts`를 통해 일관된 형식으로 변환됩니다.

## API 목록 및 역할

1. POST /vehicles: 새로운 차량 생성
2. GET /vehicles: 모든 차량 조회
3. GET /vehicles/:id: 특정 ID의 차량 조회
4. PUT /vehicles/:id: 특정 ID의 차량 정보 수정
5. DELETE /vehicles/:id: 특정 ID의 차량 삭제
6. GET /vehicles/:id/details: 특정 ID의 차량 상세 정보 조회
7. GET /vehicles/type/:type: 특정 유형의 차량 조회

## SOLID 원칙 및 OOP 적용

1. 단일 책임 원칙 (SRP):

   - 각 서비스, 컨트롤러, 리포지토리가 명확한 책임을 가집니다.
   - 예: `VehicleCalculationService`는 차량 관련 계산만 담당합니다.

2. 개방-폐쇄 원칙 (OCP):

   - `VehicleFactoryService`를 통해 새로운 차량 유형을 쉽게 추가할 수 있습니다.

3. 리스코프 치환 원칙 (LSP):

   - `Car`와 `Motorcycle` 클래스가 `Vehicle` 추상 클래스를 상속받아 다형성을 구현합니다.

4. 인터페이스 분리 원칙 (ISP):

   - `IVehicle`, `IVehicleFactory`, `IRentable` 등 작은 단위의 인터페이스를 사용합니다.

5. 의존성 역전 원칙 (DIP):
   - `VehiclesService`가 `IVehicleRepository` 인터페이스에 의존하여 구체적인 구현에 의존하지 않습니다.

OOP 적용:

- 상속: `Vehicle` 추상 클래스를 `Car`와 `Motorcycle`이 상속받습니다.
- 캡슐화: 엔티티 클래스들이 private 속성과 public 메서드를 사용합니다.
- 다형성: 팩토리 패턴을 통해 다양한 차량 유형을 생성합니다.
- 추상화: 인터페이스와 추상 클래스를 사용하여 공통 동작을 정의합니다.
