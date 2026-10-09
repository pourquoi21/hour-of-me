import type { RecordItem } from "../types/record";

interface EmotionDetailCardProps {
    record? : RecordItem | null;
}

export function EmotionDetailCard({record}: EmotionDetailCardProps) {
    if (!record) {
    return (
      <div
        style={{
          marginTop: '16px',
          padding: '20px',
          backgroundColor: '#fafafa',
          borderRadius: '12px',
          border: '1px dashed #e0e0e0',
          textAlign: 'center',
          color: '#888',
          fontSize: '14px',
        }}
      >
        남겨진 감정 조각이 없는 날이에요.
      </div>
    );
  }

  return (
    <div
      style={{
        marginTop: '16px',
        padding: '18px 20px',
        backgroundColor: '#ffffff',
        borderRadius: '14px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
        border: '1px solid #f0f0f0',
      }}
    >

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '12px',
        }}
      >
        <span style={{ fontSize: '13px', color: '#888', fontWeight: 500 }}>
          {record.date}
        </span>
        <span
          style={{
            fontSize: '12px',
            fontWeight: 600,
            padding: '4px 10px',
            borderRadius: '20px',
            backgroundColor: '#f3f4f6',
            color: '#333',
          }}
        >
          {record.emotionLabel}
        </span>
      </div>

      {record.note ? (
        <p
          style={{
            margin: 0,
            fontSize: '15px',
            color: '#2d3748',
            lineHeight: 1.6,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {record.note}
        </p>
      ) : (
        <p style={{ margin: 0, fontSize: '14px', color: '#a0aec0', fontStyle: 'italic' }}>
          남겨둔 메모가 없어요.
        </p>
      )}
    </div>
  )
}