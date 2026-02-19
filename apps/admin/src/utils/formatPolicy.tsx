import Link from "next/link";

import { Button, cn } from "@shared";

import { PolicyType } from "@shared/types/policyType";

export const formatPolicy = ({ policies }: { policies: PolicyType[] }) => {
  return policies.map((p) => {
    const isDeactive = !p.isActive;

    const cell = (children: React.ReactNode) => (
      <div className={cn(isDeactive && "text-gray-400 opacity-60")}>
        {children}
      </div>
    );

    return {
      id: p.policyId,
      cells: [
        cell(p.name),
        cell(p.requiredRole),
        // TODO: 기본 타입 확정 후 추가 구현
        cell("default_rules"),
        cell(
          p.isActive ? (
            <span className="text-primary">활성화</span>
          ) : (
            "비활성화"
          ),
        ),
        cell(
          p.isActive ? (
            <Link href={`/policy/${p.policyId}`}>
              <Button color="light" size="sm">
                수정
              </Button>
            </Link>
          ) : (
            <Button color="gray" size="sm">
              수정
            </Button>
          ),
        ),
      ],
    };
  });
};
